import { Response } from 'express';

interface ApiError {
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

export const sendApiError = (res: Response, statusCode: number, message:0, details?: Record<string, any>): Response => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(details && { details })
    }
  });
};

export type { ApiError };