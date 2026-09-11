import { Request, Response, NextFunction } from "express";

/**
 * Standard API error response structure
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  details?: Record<string, string[]> | string;
  statusCode: number;
  timestamp: string;
  path: string;
}

/**
 * Custom API error class for structured error handling
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: Record<string, string[]> | string;
  public readonly code: string;

  constructor(
    message: string,
    statusCode = 500,
    details?: Record<string, string[]> | string,
    code = "INTERNAL_ERROR"
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
    this.code = code;

    // Maintains proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Converts the error to a standardized API response
   */
  toResponse(req: Request): ApiErrorResponse {
    return {
      error: this.name,
      message: this.message,
      details: this.details,
      statusCode: this.statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
  }
}

/**
 * Predefined common API errors
 */
export const ApiErrors = {
  /**
   * 400 Bad Request - Invalid input
   */
  badRequest: (message = "Bad request", details?: Record<string, string[]> | string) =>
    new ApiError(message, 400, details, "BAD_REQUEST"),

  /**
   * 401 Unauthorized - Authentication required
   */
  unauthorized: (message = "Authentication required", details?: Record<string, string[]> | string) =>
    new ApiError(message, 401, details, "UNAUTHORIZED"),

  /**
   * 403 Forbidden - Access denied
   */
  forbidden: (message = "Access denied", details?: Record<string, string[]> | string) =>
    new ApiError(message, 403, details, "FORBIDDEN"),

  /**
   * 404 Not Found - Resource not found
   */
  notFound: (message = "Resource not found", details?: string) =>
    new ApiError(message, 404, details, "NOT_FOUND"),

  /**
   * 409 Conflict - Resource conflict
   */
  conflict: (message = "Resource conflict", details?: Record<string, string[]> | string) =>
    new ApiError(message, 409, details, "CONFLICT"),

  /**
   * 422 Unprocessable Entity - Validation failed
   */
  validationFailed: (details: Record<string, string[]> | string) =>
    new ApiError("Validation failed", 422, details, "VALIDATION_ERROR"),

  /**
   * 429 Too Many Requests - Rate limited
   */
  rateLimited: (message = "Too many requests", retryAfter?: number) =>
    new ApiError(message, 429, { retryAfter: [String(retryAfter ?? 60)] }, "RATE_LIMITED"),

  /**
   * 500 Internal Server Error
   */
  internal: (message = "Internal server error", details?: Record<string, string[]> | string) =>
    new ApiError(message, 500, details, "INTERNAL_ERROR"),

  /**
   * 503 Service Unavailable
   */
  serviceUnavailable: (message = "Service temporarily unavailable", retryAfter?: number) =>
    new ApiError(message, 503, { retryAfter: [String(retryAfter ?? 60)] }, "SERVICE_UNAVAILABLE"),
};

/**
 * Async route wrapper that catches errors and passes them to Express error handler
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Global error handler middleware for Express
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Log error for debugging
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  // Handle known API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toResponse(req));
  }

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    const zodError = err as Error & { errors: Array<{ path: (string | number)[]; message: string }> };
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of zodError.errors) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }

    return res.status(422).json({
      error: "ValidationError",
      message: "Validation failed",
      details: fieldErrors,
      statusCode: 422,
      timestamp: new Date().toISOString(),
      path: req.path,
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected error occurred",
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path: req.path,
  });
}

/**
 * Helper to send standardized success responses
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}