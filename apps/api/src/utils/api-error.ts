import type { Response } from "express";

type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
  };
};

export function sendApiError(
  res: Response,
  status: number,
  code: string,
  message: string
): Response<ApiErrorPayload> {
  return res.status(status).json({
    error: {
      code,
      message
    }
  });
}
