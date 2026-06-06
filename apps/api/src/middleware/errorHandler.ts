import { Request, Response, NextFunction } from 'express';
import { ApiError, sendError } from '../utils/apiError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ApiError) {
    sendError(res, err.message, err.status, err.code);
    return;
  }

  console.error('Unexpected error:', err);
  sendError(res, 'Internal server error', 500);
}

export function notFoundHandler(req: Request, res: Response): void {
  sendError(res, 'Resource not found', 404, 'NOT_FOUND');
}