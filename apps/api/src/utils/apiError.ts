import { Response } from 'express';

interface ApiError extends Error {
  statusCode?: number;
}

export const apiError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error: Error | string = new Error(message)
): Response => {
  return res.status(statusCode).json({
    success: false,
    error: typeof error === 'string' ? error : error.message,
    message,
    statusCode
  });
};

export const apiErrorHandler = (
  err: ApiError,
  res: Response
): Response => apiError(res, err.message, err.statusCode || 500, err);
};