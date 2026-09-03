import type { Response } from "express";

export type ApiErrorBody = {
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
  return res.status(statusCode).json({
    error: {
      code,
      message
    }
  } satisfies ApiErrorBody);
}
