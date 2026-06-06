import { Response } from 'express';

interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, any>;
}

export const sendApiError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: string,
  details?: Record<string, any>
): void => {
  const errorResponse: ApiError = {
    message,
    statusCode,
    ...(error && { error }),
    ...(details && { details })
  };

  res.status(statusCode).json({
    success: false,
    ...errorResponse
  });
};