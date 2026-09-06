import { Request, Response, NextFunction } from 'express';

/** Custom application error with HTTP status code */
export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

/** Express error-handling middleware. Catches all errors and returns JSON. */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  console.error(`[${status}] ${err.message}`);
  res.status(status).json({ error: message });
}
