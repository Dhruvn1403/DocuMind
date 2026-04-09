import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { decodeAccessToken } from '../functions/token.functions.js';
export const auth = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization')?.replace('Bearer ', '') ||
            req.cookies['accessToken'];
        if (!accessToken) {
            throw ApiError.unauthorized('No token, authorization denied');
        }
        try {
            const accessTokenDecoded = decodeAccessToken(accessToken);
            if (!accessTokenDecoded || !accessTokenDecoded.userId) {
                throw ApiError.unauthorized('Invalid token');
            }
            req.userId = accessTokenDecoded.userId;
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw ApiError.unauthorized('Access Token expired');
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=authentication.middleware.js.map