import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
export const validate = (schema) => {
    return async (req, _res, next) => {
        try {
            const parsed = (await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            }));
            if (parsed.body)
                req.body = parsed.body;
            if (parsed.query)
                req.query = parsed.query;
            if (parsed.params)
                req.params = parsed.params;
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((err) => ({
                    field: err.path.join('.').replace(/^(body|query|params)\./, ''),
                    message: err.message,
                }));
                return next(new ApiError(400, 'Validation Failed', errorMessages));
            }
            next(error);
        }
    };
};
