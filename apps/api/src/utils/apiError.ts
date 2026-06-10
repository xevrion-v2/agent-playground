export class APIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export function createErrorResponse(message: string, statusCode: number = 500): ErrorResponse {
  return {
    success: false,
    error: message,
  };
}

export function handleAPIError(error: unknown): { response: ErrorResponse; statusCode: number } {
  if (error instanceof APIError) {
    return { response: createErrorResponse(error.message), statusCode: error.statusCode };
  }
  if (error instanceof Error) {
    return { response: createErrorResponse(error.message), statusCode: 500 };
  }
  return { response: createErrorResponse('An unknown error occurred'), statusCode: 500 };
}
import { Request, Response, NextFunction } from 'express';
import { handleAPIError } from '../utils/apiError';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { response, statusCode } = handleAPIError(err);
  res.status(statusCode).json(response);
}

export default errorHandler;
import { Router, Request, Response, NextFunction } from 'express';
import { APIError, createErrorResponse } from '../utils/apiError';

const router = Router();

router.get('/health', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Simulate a potential error condition
    const dbHealthy = true;
    if (!dbHealthy) {
      throw new APIError('Database connection failed', 503);
    }
    res.json({ success: true, status: 'ok' });
  } catch (error) {
    next(error);
  }
});

export default router;