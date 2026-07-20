import { Response } from 'express';

export class ApiError extends Error {
  constructor(message: string, options?: { cause: any }) {
    super(message, options);
    this.name = 'ApiError';
  }
  res: Response, 
  statusCode: number, 
  message: string | object
) => {
  // Default to 500 if not provided
  const status = statusCode || 500;
  
  return res.status(status).json({
    error: {
      message: typeof message === 'string' ? message : 'An error occurred',
      status: status,
      ...(typeof message === 'object' && message)
    }
  });
};