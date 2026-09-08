import type { Response } from "express";

type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
  };
};

export function sendApiError(
  res: Response,
  statusCode: number,
  code: string,
  message: string
) {
  const payload: ApiErrorPayload = {
    error: {
      code,
      message,
    },
  };

  return res.status(statusCode).json(payload);
}
