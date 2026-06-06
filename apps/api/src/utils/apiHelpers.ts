import { Response } from 'express';

interface ErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}

export const sendApiError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response => {
  const response: ErrorResponse = {
    message,
    statusCode,
    ...(error && { error })
  };
  return res.status(statusCode).json(response);
};