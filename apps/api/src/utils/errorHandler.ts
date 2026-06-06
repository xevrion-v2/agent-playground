import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const apiError = (res: Response, statusCode: number, message: string, details?: any) => {
  return res.status(statusCode).json({
    error: {
      message,
      ...(details && { details })
    }
  });
};

export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }
  next(err);
};