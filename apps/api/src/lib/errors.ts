/**
 * API error response helper — creates consistent error responses.
 *
 * Usage:
 *   import { apiError } from "../lib/errors";
 *   apiError(res, 400, "Validation failed");
 */

import { Response } from "express";

export interface ApiErrorResponse {
  status: "error";
  error: {
    code: number;
    message: string;
    details?: string[];
  };
}

export function apiError(
  res: Response,
  code: number,
  message: string,
  details?: string[],
): void {
  const body: ApiErrorResponse = {
    status: "error",
    error: { code, message },
  };
  if (details && details.length > 0) {
    body.error.details = details;
  }
  res.status(code).json(body);
}
