import { Request, Response, NextFunction } from "express";

/**
 * Application-level error class with HTTP status code.
 */
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

/**
 * Centralized Express error-handling middleware.
 * Logs the error stack in non-production environments and returns
 * a consistent JSON envelope.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode =
    err instanceof AppError ? err.statusCode : 500;

  console.error(`[Error] ${err.message}`);

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
