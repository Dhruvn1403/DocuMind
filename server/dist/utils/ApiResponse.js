export class ApiResponse {
    statusCode;
    data;
    message;
    success;
    timestamp;
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
        this.timestamp = new Date().toISOString();
    }
    static success(data, message = "Success") {
        return new ApiResponse(200, data, message);
    }
    static created(data, message = "Created") {
        return new ApiResponse(201, data, message);
    }
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            timestamp: this.timestamp,
        };
    }
}
//# sourceMappingURL=ApiResponse.js.map