
import { Request, Response } from "express";

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

/**
 * Standardised API error response helper.
 * Usage: return apiError(res, 400, "VALIDATION_ERROR", "email is required");
 */
export function apiError(
  res: Response,
  status: number,
  code: string,
  message: string
): void {
  res.status(status).json({
    error: { code, message },
  });
}

/** 400 Bad Request */
export const badRequest = (res: Response, message: string) =>
  apiError(res, 400, "BAD_REQUEST", message);

/** 401 Unauthorized */
export const unauthorized = (res: Response, message = "authentication required") =>
  apiError(res, 401, "UNAUTHORIZED", message);

/** 404 Not Found */
export const notFound = (res: Response, message = "resource not found") =>
  apiError(res, 404, "NOT_FOUND", message);

/** 500 Internal Server Error (never leaks details) */
export const internalError = (res: Response) =>
  apiError(res, 500, "INTERNAL_ERROR", "an internal error occurred");
