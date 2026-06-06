import { Request, Response } from 'express';
import { ZodError } from 'zod';

interface ApiError extends Error {
  statusCode?: number;
}

export const sendApiError = (res: Response, message: string, statusCode: number = 500, details?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
  });
};

export const handleApiError = (err: any, req: Request, res: Response, next: Function) => {
  if (res.headersSent) {
    console.error('Headers already sent, cannot send error response');
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.issues,
    });
  }
  
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};