import type { Response } from "express";

type ErrorResponseOptions = {
  code?: string;
  details?: unknown;
  message: string;
  statusCode: number;
};

export function sendErrorResponse(res: Response, options: ErrorResponseOptions) {
  const { code, details, message, statusCode } = options;

  return res.status(statusCode).json({
    error: {
      code,
      details,
      message
    }
  });
}
