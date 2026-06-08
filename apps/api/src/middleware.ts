import { Request, Response, NextFunction } from "express";

/** Known HTTP error codes */
export type HttpErrorCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500;

/** Application-level error with status code */
export class AppError extends Error {
  constructor(
    public statusCode: HttpErrorCode,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Returns a consistent JSON error response.
 */
export function errorResponse(res: Response, status: number, message: string) {
  return res.status(status).json({ error: { status, message } });
}

/**
 * Express error-handling middleware.
 * Catches AppError instances and returns uniform error payloads.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return errorResponse(res, err.statusCode, err.message);
  }
  console.error(err);
  return errorResponse(res, 500, "Internal server error");
}
