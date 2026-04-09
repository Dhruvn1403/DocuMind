import { type Request, type Response, type NextFunction } from 'express';
import { createLogger } from '../utils/Logger.js';
declare global {
    namespace Express {
        interface Request {
            logger: ReturnType<typeof createLogger>;
        }
    }
}
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=logger.middleware.d.ts.map