import type { Response } from "express";

export function sendApiError(
  res: Response,
  statusCode: number,
  error: string,
  message: string
) {
  return res.status(statusCode).json({
    error,
    message
  });
}
