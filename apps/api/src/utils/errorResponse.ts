import { Response } from "express";

export interface ApiErrorResponseOptions {
  status?: number;
  message?: string;
  code?: string;
  details?: unknown;
}

export function sendError(
  res: Response,
  options: ApiErrorResponseOptions = {}
): Response {
  const status = options.status ?? 500;
  const message = options.message ?? "An unexpected error occurred";

  return res.status(status).json({
    error: {
      message,
      ...(options.code ? { code: options.code } : {}),
      ...(options.details !== undefined ? { details: options.details } : {})
    }
  });
}
