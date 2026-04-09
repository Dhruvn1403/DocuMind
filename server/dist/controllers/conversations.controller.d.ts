import type { Request, Response, NextFunction } from "express";
export declare const createConversation: (req: Request & {
    userId: string;
}, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllConversations: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteConversation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateConversation: (req: Request & {
    userId: string;
}, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=conversations.controller.d.ts.map