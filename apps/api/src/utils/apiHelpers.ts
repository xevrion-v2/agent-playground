import { Response } from 'express';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
  };
}

export const sendApiError = (res: Response, message: string, statusCode: number = 500) => {
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(errorResponse);
};