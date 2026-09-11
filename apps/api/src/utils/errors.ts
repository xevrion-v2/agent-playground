import type { Response } from "express";

export type ErrorBody = {
  error: {
    code: string;
    message: string;
  };
};

export function sendError(
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
  } satisfies ErrorBody);
}
