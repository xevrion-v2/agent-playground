import { Response } from 'express';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly isOperational = true
  ) {
    super(message);
  }
}

export const apiError = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};