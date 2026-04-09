import jwt from "jsonwebtoken";
export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_JWT_SECRET, {
        expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    });
};
export const decodeAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_JWT_SECRET);
};
export const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_JWT_SECRET, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });
};
export const decodeRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_JWT_SECRET);
};
//# sourceMappingURL=token.functions.js.map