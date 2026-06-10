import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

interface ErrorResponse {
  status: string;
  message: string;
  statusCode: number;
  stack?: string;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  const response: ErrorResponse = {
    status: 'error',
    statusCode,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};