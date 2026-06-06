import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  statusCode?: number;
}

export const handleApiError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: true,
    message: message,
    ...(err.name && { errorType: err.name })
  });
};

export const apiError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    error: true,
    message
  });
};