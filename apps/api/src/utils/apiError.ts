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

export function handleApiError(res: Response, error: unknown): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: error.message,
      details: error.details,
    });
    return;
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
  });
}