import type { Request, Response, NextFunction } from "express";

/**
 * Custom error class for API errors.
 * Carries an HTTP status code and an optional details payload
 * so the error-handling middleware can send consistent responses.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /** Convenience factory for 400 Bad Request */
  static badRequest(message: string, details?: unknown): ApiError {
    return new ApiError(400, message, details);
  }

  /** Convenience factory for 404 Not Found */
  static notFound(message: string, details?: unknown): ApiError {
    return new ApiError(404, message, details);
  }

  /** Convenience factory for 409 Conflict */
  static conflict(message: string, details?: unknown): ApiError {
    return new ApiError(409, message, details);
  }

  /** Convenience factory for 500 Internal Server Error */
  static internal(message: string, details?: unknown): ApiError {
    return new ApiError(500, message, details);
  }
}

/**
 * Express error-handling middleware.
 * Catches any error thrown (or passed via `next(err)`) and sends a
 * consistent JSON response.  Unknown errors are mapped to 500.
 *
 * Must be registered **after** all route middlewares so Express
 * recognises the 4-parameter signature as an error handler.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  const body: { error: Record<string, unknown> } = {
    error: {
      message,
      status: statusCode,
    },
  };

  // Attach details for ApiError instances that carry additional info
  if (err instanceof ApiError && err.details !== undefined) {
    body.error.details = err.details;
  }

  // Only include stack trace in development
  if (process.env.NODE_ENV !== "production" && err.stack) {
    body.error.stack = err.stack;
  }

  res.status(statusCode).json(body);
}
