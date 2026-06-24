import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = (err as any).statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({
    error: "Resource not found"
  });
}
