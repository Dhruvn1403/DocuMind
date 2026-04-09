import type { NextFunction, Request, Response } from "express";
import { type ZodObject } from "zod";
export declare const validate: (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.middleware.d.ts.map