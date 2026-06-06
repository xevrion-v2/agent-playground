import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: Record<string, any>;
  };
  status: number;
}

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof ApiError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  const code = err instanceof ApiError ? err.code : 'INTERNAL_ERROR';
  const details = err instanceof ApiError ? err.details : undefined;

  const errorResponse: ErrorResponse = {
    error: {
      message,
      code,
      ...(details && { details })
    },
    status: statusCode
  };

  res.status(statusCode).json(errorResponse);
};