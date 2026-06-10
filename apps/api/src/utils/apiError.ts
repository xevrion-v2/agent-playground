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
  }
}

export function sendApiError(res: Response, error: ApiError): Response {
  return res.status(error.statusCode).json({
    success: false,
    error: {
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    },
  });
}