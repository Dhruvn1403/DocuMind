import { Schema } from 'mongoose';
const messageSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversations' },
    sender: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    media: [
        {
            url: { type: String, required: true },
            mimeType: { type: String, required: true },
            fileName: { type: String, required: false },
            mediaType: {
                type: String,
                enum: ['image', 'audio', 'video', 'document'],
                required: false,
            },
        },
    ],
}, { timestamps: true });
export const getMessagesModel = (conn) => conn.models.Messages || conn.model('Messages', messageSchema);
//# sourceMappingURL=message.model.js.map