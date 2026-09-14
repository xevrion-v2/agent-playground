import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";

/**
 * Custom API error class with status code and safe message.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Standard error response shape.
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * Bounds a status code to a valid HTTP error range (400-599).
 * Defaults to 500 for invalid or out-of-range values.
 */
const boundStatusCode = (statusCode: unknown): number => {
  if (typeof statusCode !== "number" || !isFinite(statusCode)) {
    return 500;
  }
  const code = Math.floor(statusCode);
  if (code < 400 || code > 599) {
    return 500;
  }
  return code;
};

/**
 * Express error-handling middleware.
 * Provides bounded status handling and safe JSON error responses.
 *
 * Must be registered after all routes and other middleware.
 *
 * Usage:
 *   app.use(errorHandler);
 */
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Determine status code with bounded handling
  let statusCode: number;
  let message: string;

  if (err instanceof ApiError) {
    statusCode = boundStatusCode(err.statusCode);
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    // For non-operational errors, use a safe generic message
    message = "Internal Server Error";
    // Log the actual error for debugging
    console.error("[Error]", err.message, err.stack);
  } else {
    statusCode = 500;
    message = "Internal Server Error";
    console.error("[Error]", "Unknown error type:", err);
  }

  // Build safe JSON error response
  const response: ErrorResponse = {
    error: statusCode >= 500 ? "Internal Server Error" : "Bad Request",
    message,
    statusCode,
  };

  // Ensure headers haven't already been sent
  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json(response);
};

/**
 * Creates a configurable error handler with optional custom logger.
 *
 * @param options - Configuration options
 * @returns An Express ErrorRequestHandler
 */
export const createErrorHandler = (options?: {
  logger?: (message: string, error: unknown) => void;
  includeStack?: boolean;
}): ErrorRequestHandler => {
  const logger = options?.logger ?? console.error;
  const includeStack = options?.includeStack ?? false;

  return (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    let statusCode: number;
    let message: string;
    let stack: string | undefined;

    if (err instanceof ApiError) {
      statusCode = boundStatusCode(err.statusCode);
      message = err.message;
    } else if (err instanceof Error) {
      statusCode = 500;
      message = "Internal Server Error";
      stack = err.stack;
      logger(`[Error] ${err.message}`, err);
    } else {
      statusCode = 500;
      message = "Internal Server Error";
      logger("[Error] Unknown error type:", err);
    }

    const response: ErrorResponse & { stack?: string } = {
      error: statusCode >= 500 ? "Internal Server Error" : "Bad Request",
      message,
      statusCode,
    };

    if (includeStack && stack) {
      response.stack = stack;
    }

    if (res.headersSent) {
      return;
    }

    res.status(statusCode).json(response);
  };
};

export default errorHandler;
