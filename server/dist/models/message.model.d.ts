import { Schema, type Model, type Connection } from 'mongoose';
export interface IMessageMediaItem {
    url: string;
    mimeType: string;
    fileName?: string;
    mediaType?: 'image' | 'audio' | 'video' | 'document';
}
export interface IMessage {
    _id: Schema.Types.ObjectId;
    conversationId: Schema.Types.ObjectId;
    sender: 'user' | 'assistant';
    content: string;
    media?: IMessageMediaItem[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const getMessagesModel: (conn: Connection) => Model<IMessage>;
//# sourceMappingURL=message.model.d.ts.map