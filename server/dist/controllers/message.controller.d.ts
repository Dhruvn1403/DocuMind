import type { Request, Response, NextFunction } from "express";
export declare const createMessage: (req: Request & {
    userId: string;
}, res: Response, next: NextFunction) => Promise<void>;
export declare const getMessagesByConversation: (req: Request & {
    userId: string;
}, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=message.controller.d.ts.map