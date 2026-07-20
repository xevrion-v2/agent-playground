import { Response } from 'express';

interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: any;
}

export const sendApiError = (
  res: Response,
  message: string,
  code: string = 'INTERNAL_ERROR',
  statusCode: number = 500,
  details?: any
): void => {
  const errorResponse: ApiError = { message, code, statusCode, details };
  res.status(statusCode).json({ error: errorResponse });
};