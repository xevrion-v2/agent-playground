// src/utils/apiError.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details || null,
      },
    });
    return;
  }

  console.error('Unexpected error:', err);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      details: process.env.NODE_ENV === 'production' ? null : { stack: err.stack },
    },
  });
};