import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export function errorResponse(res: Response, status: number, message: string) {
  return res.status(status).json({ error: { status, message } });
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return errorResponse(res, err.statusCode, err.message);
  }
  console.error(err);
  return errorResponse(res, 500, "Internal server error");
}
