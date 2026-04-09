import mongoose from 'mongoose';
import logger from '../utils/Logger.js';
import { ApiError } from './ApiError.js';
let baseConnection = null;
export async function getConnection() {
    if (!baseConnection) {
        baseConnection = await mongoose
            .connect(process.env.MONGODB_URL, { dbName: process.env.MONGODB_NAME })
            .then(m => m.connection);
        logger.info('MongoDB connected successfully');
    }
    if (!baseConnection) {
        throw new ApiError("MongoDB connection not initialized");
    }
    return baseConnection;
}
//# sourceMappingURL=Connections.js.map