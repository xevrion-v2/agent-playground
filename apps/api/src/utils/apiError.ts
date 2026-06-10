import { Response } from 'express';

export interface ApiErrorOptions {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.statusCode = options.statusCode;
    this.errors = options.errors;
    this.name = 'ApiError';
  }
}

export function sendApiError(res: Response, error: ApiError | Error): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error',
  });
}