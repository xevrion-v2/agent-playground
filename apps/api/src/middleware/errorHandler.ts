import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode: number;
}

export function createApiError(statusCode: number, message: string): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
}

export function apiErrorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    error: {
      message,
      code: status,
    },
  });
}
