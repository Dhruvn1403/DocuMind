import { Schema, type Model, type Connection } from 'mongoose';
export interface IAccounts {
    userId: Schema.Types.ObjectId;
    provider: string;
    accessToken?: string | null;
    accessTokenExpiresAt?: Date | null;
    refreshToken?: string | null;
    refreshTokenExpiresAt?: Date | null;
    idToken?: string | null;
    password?: string | null;
    createdAt: string;
    updatedAt: string;
}
export declare const getAccountsModel: (conn: Connection) => Model<IAccounts>;
//# sourceMappingURL=accounts.model.d.ts.map