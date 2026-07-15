import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly code: string = "API_ERROR",
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(400, message, "BAD_REQUEST", details);
  }

  static notFound(message: string = "Resource not found", details?: unknown) {
    return new ApiError(404, message, "NOT_FOUND", details);
  }

  static internal(message: string = "Internal server error", details?: unknown) {
    return new ApiError(500, message, "INTERNAL_ERROR", details);
  }

  static unauthorized(message: string = "Unauthorized", details?: unknown) {
    return new ApiError(401, message, "UNAUTHORIZED", details);
  }

  static forbidden(message: string = "Forbidden", details?: unknown) {
    return new ApiError(403, message, "FORBIDDEN", details);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Internal server error" }
  });
}
