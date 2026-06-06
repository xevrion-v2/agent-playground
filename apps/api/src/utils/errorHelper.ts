import { Response } from 'express';

interface ErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}

export const sendApiError = (
  res: Response,
  message: string,
  code: string,
  statusCode: number = 400,
  details?: any
): void => {
  res.status(statusCode).json({
    error: { message, code, statusCode, details }
  } as ErrorResponse);
};