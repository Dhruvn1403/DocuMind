import { streamText, } from "ai";
import { resolveModel } from "../utils/AiProvider.js";
import { getConnection } from "../utils/Connections.js";
import { ApiError } from "../utils/ApiError.js";
import { getConversationsModel } from "../models/conversations.model.js";
import { getMessagesModel } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { normalizeDocumentationSlug } from "../constants/documentation.js";
async function fetchRemoteMedia(url, mimeFallback) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch media (${response.status}): ${url}`);
    }
    const mime = response.headers.get("content-type")?.split(";")[0]?.trim() || mimeFallback;
    const buf = Buffer.from(await response.arrayBuffer());
    return { bytes: new Uint8Array(buf), mime };
}
const DEFAULT_GROQ_VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
function userContentIsMultimodal(content) {
    return typeof content !== "string";
}
function messagesIncludeMultimodalUserTurns(messages) {
    return messages.some((m) => m.role === "user" && userContentIsMultimodal(m.content));
}
function groqModelIdSupportsVisionUserContent(modelId) {
    const id = modelId.toLowerCase();
    return (id.includes("llama-4") ||
        id.includes("llama4") ||
        id.includes("vision"));
}
function resolveEffectiveGroqModelId(requestedModel, messages) {
    if (!messagesIncludeMultimodalUserTurns(messages))
        return requestedModel;
    if (groqModelIdSupportsVisionUserContent(requestedModel))
        return requestedModel;
    const fromEnv = process.env.GROQ_VISION_MODEL_ID?.trim();
    return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_GROQ_VISION_MODEL;
}
function mediaItemIsImage(item) {
    return (item.mimeType?.startsWith("image/") === true || item.mediaType === "image");
}
async function buildUserContent(content, media, provider) {
    if (!media?.length)
        return content;
    const text = content?.trim().length
        ? content
        : "Please analyze the attached media and describe key details.";
    const parts = [{ type: "text", text }];
    for (const item of media) {
        const isImage = mediaItemIsImage(item);
        if (provider === "groq") {
            if (isImage) {
                const { bytes, mime } = await fetchRemoteMedia(item.url, item.mimeType || "image/jpeg");
                parts.push({
                    type: "image",
                    image: bytes,
                    mediaType: mime,
                });
            }
            else {
                const { bytes, mime } = await fetchRemoteMedia(item.url, item.mimeType || "application/octet-stream");
                parts.push({
                    type: "file",
                    data: bytes,
                    mediaType: item.mimeType || mime,
                    filename: item.fileName,
                });
            }
            continue;
        }
        if (isImage) {
            parts.push({
                type: "image",
                image: item.url,
                mediaType: item.mimeType,
            });
        }
        else {
            parts.push({
                type: "file",
                data: item.url,
                mediaType: item.mimeType,
                filename: item.fileName,
            });
        }
    }
    return parts;
}
async function historyToModelMessages(history, provider) {
    const messages = [];
    for (const m of history) {
        if (m.sender === "assistant") {
            messages.push({
                role: "assistant",
                content: m.content,
            });
            continue;
        }
        messages.push({
            role: "user",
            content: await buildUserContent(m.content, Array.isArray(m.media) ? m.media : [], provider),
        });
    }
    return messages;
}
function serializeMessage(doc) {
    return {
        _id: String(doc._id),
        conversationId: String(doc.conversationId),
        sender: doc.sender,
        content: doc.content,
        media: (doc.media ?? []),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
function writeSse(res, payload) {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
}
export const createMessage = async (req, res, next) => {
    try {
        const { content, provider, model, conversationId, media = [], documentation: documentationFromBody, } = req.body;
        const db = await getConnection();
        const Conversation = getConversationsModel(db);
        const Message = getMessagesModel(db);
        let newConversationId = conversationId ?? null;
        let effectiveDocumentation = normalizeDocumentationSlug(documentationFromBody);
        if (!conversationId) {
            const conversation = await Conversation.create({
                userId: req.userId,
                name: "New Conversation",
                documentation: effectiveDocumentation,
            });
            newConversationId = conversation._id;
        }
        else {
            const existing = await Conversation.findOne({
                _id: conversationId,
                userId: req.userId,
            }).select("documentation");
            if (!existing) {
                throw ApiError.notFound("Conversation not found");
            }
            effectiveDocumentation = normalizeDocumentationSlug(existing.documentation);
        }
        if (!provider || !model) {
            throw ApiError.badRequest("provider, model and apiKey required");
        }
        const userMessage = await Message.create({
            conversationId: newConversationId,
            sender: "user",
            content,
            media,
        });
        const history = await Message.find({ conversationId: newConversationId })
            .sort({ createdAt: 1 })
            .lean();
        res.status(200);
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders?.();
        writeSse(res, {
            type: "start",
            newConversationId,
            documentation: effectiveDocumentation,
            userMessage: serializeMessage(userMessage),
        });
        let fullText = "";
        const messages = await historyToModelMessages(history, provider);
        const modelIdForProvider = provider === "groq"
            ? resolveEffectiveGroqModelId(model, messages)
            : model;
        const docName = effectiveDocumentation.charAt(0).toUpperCase() + effectiveDocumentation.slice(1);
        messages.unshift({
            role: "system",
            content: `You are an assistant specialized in ${docName} documentation. Only answer questions related to ${docName} documentation. If the question is not related to ${docName} documentation, respond with: "Please make another chat for that specific documentation to talk about it."`
        });
        const result = streamText({
            model: resolveModel(provider, modelIdForProvider),
            messages,
        });
        try {
            for await (const delta of result.textStream) {
                if (!delta)
                    continue;
                fullText += delta;
                writeSse(res, {
                    type: "data",
                    text: delta,
                });
            }
            const assistantContent = fullText.trim().length
                ? fullText
                : "I couldn't generate a detailed response for that media. Please try again with another model or prompt.";
            const assistantMessage = await Message.create({
                conversationId: newConversationId,
                sender: "assistant",
                content: assistantContent,
            });
            writeSse(res, {
                type: "done",
                assistantMessage: serializeMessage(assistantMessage),
            });
            res.end();
        }
        catch (streamErr) {
            writeSse(res, {
                type: "error",
                message: streamErr instanceof Error
                    ? streamErr.message
                    : "Generation failed",
            });
            res.end();
        }
    }
    catch (error) {
        next(error);
    }
};
export const getMessagesByConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            throw ApiError.badRequest("Conversation Id is required");
        }
        const dbConnection = await getConnection();
        const Conversation = getConversationsModel(dbConnection);
        const Message = getMessagesModel(dbConnection);
        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.userId,
        }).select("_id name documentation createdAt updatedAt");
        if (!conversation) {
            throw ApiError.notFound("Conversation not found");
        }
        const messages = await Message.find({
            conversationId: conversation._id,
        })
            .sort({ createdAt: 1 })
            .select("_id conversationId sender content media createdAt updatedAt");
        res
            .status(200)
            .json(ApiResponse.success({
            messages: messages.map((m) => serializeMessage(m)),
            conversation: {
                _id: String(conversation._id),
                name: conversation.name,
                documentation: normalizeDocumentationSlug(conversation.documentation),
            },
        }, "Messages retrieved successfully"));
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=message.controller.js.map