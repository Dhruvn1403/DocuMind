import { Schema, type Model, type Connection } from 'mongoose';
import { type DocumentationSlug } from '../constants/documentation.js';
export interface IConversations {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    name: string;
    documentation?: DocumentationSlug;
    createdAt: Date;
    updatedAt: Date;
}
export declare const getConversationsModel: (conn: Connection) => Model<IConversations>;
//# sourceMappingURL=conversations.model.d.ts.map