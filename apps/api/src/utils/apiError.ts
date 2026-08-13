import { Request, Response, NextFunction } from "express";

/**
 * Custom API error class for structured error responses.
 *
 * @example
 * throw new ApiError(404, "User not found", { userId: "123" });
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Send a standardized JSON error response.
 *
 * @example
 * return sendError(res, 404, "User not found", { userId: "123" });
 */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  details?: unknown
): void {
  res.status(statusCode).json({
    error: {
      statusCode,
      message,
      ...(details !== undefined && { details }),
    },
  });
}

/**
 * Global Express error handler middleware.
 * Catches ApiError instances and returns structured responses;
 * falls back to 500 for unhandled errors.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    sendError(res, err.statusCode, err.message, err.details);
    return;
  }

  res.status(500).json({
    error: {
      statusCode: 500,
      message: "Internal server error",
    },
  });
}
