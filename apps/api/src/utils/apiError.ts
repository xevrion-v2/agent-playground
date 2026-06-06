import { Response } from 'express';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

export const apiError = (res: Response, statusCode: number, message: string, details?: any): Response => {
  const errorResponse: ErrorResponse = {
    error: 'Error',
    message,
    ...(details && { details })
  };
  
  return res.status(statusCode).json(errorResponse);
};

export const sendApiError = apiError;