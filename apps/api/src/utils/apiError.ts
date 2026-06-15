import type { Response } from "express";

export type ApiErrorCode =
  | "NOT_IMPLEMENTED"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export function sendApiError(
  res: Response,
  status: number,
  message: string,
  code: ApiErrorCode = "INTERNAL_ERROR"
) {
  return res.status(status).json({
    error: {
      code,
      message
    }
  });
}
