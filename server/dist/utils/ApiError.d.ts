export declare class ApiError extends Error {
    statusCode: number;
    status: string;
    metadata?: Record<string, any>;
    constructor(message: string, statusCode?: number, metadata?: Record<string, any>);
    toJSON(): {
        statusCode: number;
        status: string;
        message: string;
        metadata: Record<string, any> | undefined;
        stack: string | undefined;
    };
    static badRequest(message: string, metadata?: Record<string, any>): ApiError;
    static unauthorized(message?: string, metadata?: Record<string, any>): ApiError;
    static forbidden(message?: string, metadata?: Record<string, any>): ApiError;
    static notFound(message?: string, metadata?: Record<string, any>): ApiError;
    static conflict(message: string, metadata?: Record<string, any>): ApiError;
    static internal(message?: string, metadata?: Record<string, any>): ApiError;
}
//# sourceMappingURL=ApiError.d.ts.map