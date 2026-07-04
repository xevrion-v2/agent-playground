import type { Response } from "express";

export type ApiErrorResponse = {
  status: "error";
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

type ApiErrorOptions = {
  code?: string;
  details?: unknown;
};

export function sendApiError(
  res: Response,
  statusCode: number,
  message: string,
  options: ApiErrorOptions = {}
): Response<ApiErrorResponse> {
  const error: ApiErrorResponse["error"] = {
    code: options.code ?? "API_ERROR",
    message
  };

  if (options.details !== undefined) {
    error.details = options.details;
  }

  return res.status(statusCode).json({
    status: "error",
    error
  });
}
