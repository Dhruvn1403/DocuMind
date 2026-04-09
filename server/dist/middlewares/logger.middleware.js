import { createLogger } from '../utils/Logger.js';
import { generateUUID } from '../functions/uuid.functions.js';
export const requestLogger = (req, res, next) => {
    const startTime = process.hrtime.bigint();
    req.logger = createLogger("DocAssist").child({ requestId: generateUUID() });
    req.logger.info(`${req.method} ${req.originalUrl}`, {
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: req.method !== 'GET' ? req.body : undefined,
        query: Object.keys(req.query).length > 0 ? req.query : undefined,
        params: Object.keys(req.params).length > 0 ? req.params : undefined,
    });
    res.on('finish', () => {
        const endTime = process.hrtime.bigint();
        const durationMs = Number(endTime - startTime) / 1_000_000;
        req.logger.info(`Response sent ${req.method} ${req.originalUrl}`, {
            statusCode: res.statusCode,
            responseTimeMs: Number(durationMs.toFixed(2)),
        });
    });
    next();
};
//# sourceMappingURL=logger.middleware.js.map