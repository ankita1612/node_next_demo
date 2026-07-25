import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
export const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }
    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        ...(error.errors?.length > 0 && { errors: error.errors }),
        ...(env.NODE_ENV === 'development' && { stack: error.stack }),
    };
    if (env.NODE_ENV === 'development') {
        console.error(`[Error] ${req.method} ${req.url}:`, err);
    }
    res.status(error.statusCode).json(response);
};
