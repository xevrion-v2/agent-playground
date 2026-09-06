import type { Response } from "express";

export type ApiErrorPayload = {
  status: "error";
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
    status: "error",
    error: {
      code,
      message
    }
  };

  return res.status(statusCode).json(payload);
}
