import { Response } from 'express';

export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }
}

export function sendError(res: Response, error: unknown): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        ...(error.details && { details: error.details }),
      },
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
      },
    });
    console.error('Unhandled error:', error);
    return;
  }

  res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
    },
  });
}