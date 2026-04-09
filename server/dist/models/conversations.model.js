import { Schema } from 'mongoose';
import { DOCUMENTATION_SLUGS, } from '../constants/documentation.js';
const conversationsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    name: { type: String, required: true },
    documentation: {
        type: String,
        enum: DOCUMENTATION_SLUGS,
        default: 'stripe',
    },
}, { timestamps: true });
export const getConversationsModel = (conn) => conn.models.Conversations || conn.model('Conversations', conversationsSchema);
//# sourceMappingURL=conversations.model.js.map