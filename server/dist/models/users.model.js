import { Schema } from 'mongoose';
const usersSchema = new Schema({
    fcmToken: { type: String },
    name: {
        type: String,
    },
    email: { type: String },
    emailVerified: { type: Boolean },
    mobileNumber: { type: String },
    mobileNumberVerified: { type: Boolean },
    photo: { type: String },
    status: { type: String, default: 'pending' },
    deletedAt: { type: Date },
    otp: { type: String },
    otpExpiresAt: { type: String },
}, { timestamps: true });
export const getUsersModel = (conn) => conn.models.Users || conn.model('Users', usersSchema);
//# sourceMappingURL=users.model.js.map