import { Schema, type Model, type Connection } from 'mongoose';
export interface IUsers {
    _id: Schema.Types.ObjectId;
    fcmToken?: string;
    userType: string;
    name: string;
    email: string;
    emailVerified: boolean;
    mobileNumber: string;
    mobileNumberVerified: boolean;
    photo: string;
    otp: string;
    otpExpiresAt: string;
    status: "verified" | "pending" | "deleted";
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const getUsersModel: (conn: Connection) => Model<IUsers>;
//# sourceMappingURL=users.model.d.ts.map