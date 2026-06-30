import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      message: err.message,
    });
  }

  console.error(err);
  res.status(500).json({
    error: 'Internal server error',
  });
}