import { Request, Response, NextFunction } from 'express';
import { APIError } from '../utils/apiError';

export const errorHandlingMiddleware = (
  err: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { statusCode, message, errors } = err;
  
  // Default error response
  const errorResponse = {
    status: 'error',
    statusCode: statusCode || 500,
    message: message || 'Internal Server Error',
    errors: errors || [],
  };

  // For development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode || 500).json({
      ...errorResponse,
      stack: err.stack,
    });
  }

  return res.status(statusCode || 500).json(errorResponse);
};