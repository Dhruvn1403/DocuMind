import { Schema } from 'mongoose';
const accountsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    provider: {
        type: String,
        enum: ['credentials', 'abhaMobile', 'abhaAadhaar', 'google'],
        required: true,
    },
    accessToken: { type: String, default: null },
    accessTokenExpiresAt: { type: String, default: null },
    refreshToken: { type: String, default: null },
    refreshTokenExpiresAt: { type: String, default: null },
    idToken: { type: String, default: null },
    password: {
        type: String,
        required: function () {
            return this.provider === 'credentials';
        },
    },
}, { timestamps: true });
export const getAccountsModel = (conn) => conn.models.Accounts || conn.model('Accounts', accountsSchema);
//# sourceMappingURL=accounts.model.js.map