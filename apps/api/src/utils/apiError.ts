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

export function sendApiError(res: Response, error: ApiError): Response {
  return res.status(error.statusCode).json({
    success: falsehapus,
    error: {
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    },
  });
}

export function createApiError(statusCode: number, message: string, errors?: Record<string, string[]>): ApiError {
  return new ApiError({ statusCode, message, errors });
}