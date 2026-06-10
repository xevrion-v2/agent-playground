import { Response } from 'express';

interface ApiError extends Error {
  statusCode?: number;
  message: string;
}

export const sendApiError = (res: Response, error: ApiError, statusCode: number = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message: error.message,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    }
  });
};

export const createApiError = (message: string, statusCode: number = 500): ApiError => {
  return { message, statusCode };
};