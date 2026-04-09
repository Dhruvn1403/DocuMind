import jwt from "jsonwebtoken";
export declare const generateAccessToken: (data: any) => string;
export declare const decodeAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const generateRefreshToken: (data: any) => string;
export declare const decodeRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=token.functions.d.ts.map