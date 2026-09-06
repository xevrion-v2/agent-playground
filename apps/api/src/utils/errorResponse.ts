import type { Response } from "express";

type ErrorResponseOptions = {
  details?: unknown;
};

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  options: ErrorResponseOptions = {}
) {
  return res.status(statusCode).json({
    error: {
      message,
      ...(options.details === undefined ? {} : { details: options.details })
    }
  });
}
