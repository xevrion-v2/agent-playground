import { Request, Response, NextFunction } from 'express';
import { APIError, sendErrorResponse } from '../utils/apiError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof APIError) {
    return sendErrorResponse(res, err);
  }

  // Handle unexpected errors
  console.error('Unexpected error:', err);
  const internalError = new APIError(
    'Internal server error',
    500
  );
  return sendErrorResponse(res, internalError);
};