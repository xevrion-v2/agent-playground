import type { Response } from "express";

export type ApiErrorCode = "invalid_request";

export type ApiErrorResponse = {
  status: "error";
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export function sendApiError(
  res: Response,
  statusCode: number,
  code: ApiErrorCode,
  message: string
) {
  const body: ApiErrorResponse = {
    status: "error",
    error: {
      code,
      message
    }
  };

  return res.status(statusCode).json(body);
}
