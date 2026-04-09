export declare class ApiResponse<T = any> {
    readonly statusCode: number;
    readonly data: T | null;
    readonly message: string;
    readonly success: boolean;
    readonly timestamp: string;
    constructor(statusCode: number, data: T | null, message?: string);
    static success<T>(data: T, message?: string): ApiResponse<T>;
    static created<T>(data: T, message?: string): ApiResponse<T>;
    toJSON(): {
        success: boolean;
        statusCode: number;
        message: string;
        data: T | null;
        timestamp: string;
    };
}
//# sourceMappingURL=ApiResponse.d.ts.map