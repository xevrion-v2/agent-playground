import { Response } from "express";

export function sendApiError(
  res: Response,
  status: number,
  message: string,
  details?: unknown
) {
  res.status(status).json({
    error: true,
    message,
    ...(details ? { details } : {}),
  });
}
