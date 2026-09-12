import { Request, Response, NextFunction } from 'express';
import { ApiError, createErrorResponse } from '../utils/errorHandler';

export function errorResponder(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      createErrorResponse(err.statusCode, err.message, err.details)
    );
  }

  // Handle generic errors
  if (err) {
    return res.status(500).json(
      createErrorResponse(500, 'Internal Server Error', {
        error: err.message || 'Something went wrong'
      })
    );
  }

  next();
}

export const errorHandler = () => {
  return errorResponder;
}