import { Request, Response, NextFunction } from "express";

/**
 * Custom error class for API errors with an HTTP status code.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(statusCode: number, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message = "Bad request", details?: Record<string, unknown>) {
    return new ApiError(400, message, details);
  }

  static notFound(message = "Resource not found", details?: Record<string, unknown>) {
    return new ApiError(404, message, details);
  }

  static internal(message = "Internal server error", details?: Record<string, unknown>) {
    return new ApiError(500, message, details);
  }
}

/**
 * Send a JSON error response consistent with the API response shape.
 */
export function sendErrorResponse(res: Response, error: ApiError) {
  const body: Record<string, unknown> = {
    error: {
      message: error.message,
      status: error.statusCode,
    },
  };
  if (error.details) {
    (body.error as Record<string, unknown>).details = error.details;
  }
  return res.status(error.statusCode).json(body);
}

/**
 * Express error-handling middleware.
 * Catches ApiError instances and returns a structured JSON response.
 * Unknown errors are logged and returned as 500 Internal Server Error.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return sendErrorResponse(res, err);
  }

  console.error(`[error] Unhandled error:`, err);
  return sendErrorResponse(res, ApiError.internal());
}
