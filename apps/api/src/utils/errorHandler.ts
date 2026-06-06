import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface ApiError extends Error {
  statusCode?: number;
}

export const handleApiError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request data',
      details: err.errors
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  return res.status(statusCode).json({
    error: err.name || 'Error',
    message
  });
};

export const apiErrorHandler = handleApiError;