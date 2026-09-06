import { Response, NextFunction } from "express";

/** Standard error response shape. */
export type ApiError = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

/**
 * Create a standardised JSON error response.
 *
 * @param res   - Express Response object
 * @param status - HTTP status code
 * @param code   - Machine-readable error code (e.g. `"VALIDATION_ERROR"`)
 * @param message - Human-readable description
 * @param details - Optional extra context (stack traces omitted in production)
 */
export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown
): void {
  const body: ApiError = {
    error: { code, message },
  };
  if (details !== undefined && process.env.NODE_ENV !== "production") {
    body.error.details = details;
  }
  res.status(status).json(body);
}

/**
 * Express error-handling middleware.
 * Catches unhandled errors and returns a consistent JSON shape.
 */
export function errorHandler(
  err: Error,
  _req: unknown,
  res: Response,
  _next: NextFunction
): void {
  console.error("[api-error]", err);
  sendError(res, 500, "INTERNAL_ERROR", "An unexpected error occurred.");
}
