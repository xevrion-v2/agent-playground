import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
  };
}

export const apiErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    }
  };

  res.status(statusCode).json(errorResponse);
};