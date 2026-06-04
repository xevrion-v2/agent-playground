import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode: number;
}

export function createApiError(statusCode: number, message: string): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: err.message || "Internal Server Error",
    },
  });
}
