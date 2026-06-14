import { Request, Response, NextFunction } from "express";

/**
 * Error response shape used across the API.
 */
export interface ApiErrorResponse {
  error: {
    message: string;
    status: number;
    details?: unknown;
  };
}

/**
 * Custom application error that carries an HTTP status code.
 */
export class AppError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Wraps an async route handler so thrown / rejected errors are forwarded
 * to Express error-handling middleware via `next()`.
 *
 * @example
 * router.get("/", asyncHandler(async (req, res) => { … }));
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Global Express error-handling middleware.
 *
 * Produces a consistent JSON error response for every unhandled error.
 * Attach with `app.use(errorHandler)` **after** all routes.
 *
 * @example
 * app.use(errorHandler);
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
        details: err.details,
      },
    } satisfies ApiErrorResponse);
    return;
  }

  // Unexpected / unknown error
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: {
      message: "Internal Server Error",
      status: 500,
    },
  } satisfies ApiErrorResponse);
}
