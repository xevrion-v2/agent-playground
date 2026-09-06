import type { Response } from "express";

type ApiErrorCode = "bad_request" | "internal_error";

export function sendApiError(
  res: Response,
  statusCode: number,
  code: ApiErrorCode,
  message: string
) {
  return res.status(statusCode).json({
    error: {
      code,
      message
    }
  });
}
