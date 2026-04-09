import multer from 'multer';
declare global {
    namespace Express {
        namespace Multer {
            interface File {
                serverName: string;
            }
        }
    }
}
export declare const upload: multer.Multer;
//# sourceMappingURL=multer.middleware.d.ts.map