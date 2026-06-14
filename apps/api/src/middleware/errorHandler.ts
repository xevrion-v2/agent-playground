import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = (err as any).statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";
  console.error(`[error] ${err.message}`, isProduction ? "" : err.stack);
  res.status(statusCode).json({
    error: {
      message: isProduction && statusCode === 500 ? "Internal Server Error" : err.message,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
}
