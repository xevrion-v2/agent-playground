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
): Response => {
  const statusCode = err.statusCode || 500;
  return apiError(res, err.message, statusCode, err);
};

export const notFound = (res: Response): Response => {
  return apiError(res, 'Not found', 404);
};

export const badRequest = (res: Response, message: string): Response => {
  return apiError(res, message, 400);
};