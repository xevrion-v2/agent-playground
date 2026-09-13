/**
 * API error handling helper for Express applications.
 */
import type { Response } from "express";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message = "Bad request"): ApiError {
    return new ApiError(400, message, "BAD_REQUEST");
  }

  static notFound(message = "Resource not found"): ApiError {
    return new ApiError(404, message, "NOT_FOUND");
  }

  static internal(message = "Internal server error"): ApiError {
    return new ApiError(500, message, "INTERNAL_ERROR");
  }
}

export function sendError(res: Response, err: ApiError, detail?: string): void {
  res.status(err.status).json({
    error: err.message,
    message: detail ?? err.message,
  });
}
