import { ApiError } from "../utils/ApiError.js";
export const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const zodError = result.error;
            const errors = zodError.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            throw ApiError.badRequest(errors[0]?.message, {
                validationErrors: errors,
            });
        }
        req.body = result.data;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=validate.middleware.js.map