import { Request, Response, NextFunction } from "express";

export interface ApiError {
  statusCode: number;
  message: string;
}

export function createError(statusCode: number, message: string): ApiError {
  return { statusCode, message };
}

export function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  const message = err.message || "Internal server error";
  console.error("[ErrorHandler]", statusCode, message);
  res.status(statusCode).json({ error: message });
}
