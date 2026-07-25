import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = err;

  // Handle PostgreSQL Unique Constraint Violation (Error Code 23505)
  if (err.code === '23505') {
    const detail = err.detail || '';
    const match = detail.match(/Key \((.*?)\)=\((.*?)\) already exists/);
    const field = match ? match[1] : 'field';
    const message = match ? `An employee with this ${field} already exists.` : 'Duplicate entry error.';
    error = new ApiError(409, message, [{ field, message }]);
  }

  // Fallback for non-ApiError instances
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const responsePayload = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    ...(error.errors?.length > 0 && { errors: error.errors }),
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (env.NODE_ENV === 'development') {
    console.error(`[API Error] ${req.method} ${req.url}:`, err);
  }

  res.status(error.statusCode).json(responsePayload);
};
