import { Response } from "express";

/**
 * Standardized API error response helper.
 *
 * Provides a consistent error envelope across all routes so API consumers
 * can rely on a uniform error shape with status, message, and optional details.
 *
 * @module utils/errorHandler
 */

export interface ApiErrorBody {
  status: "error" | "fail";
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Send a standardized error response.
 *
 * @param res - Express Response object.
 * @param statusCode - HTTP status code (e.g. 400, 404, 500).
 * @param message - Human-readable error description.
 * @param code - Optional machine-readable error code (e.g. "VALIDATION_ERROR").
 * @param details - Optional additional payload (validation errors, stack traces in dev, etc.).
 *
 * @example
 * // In a route handler:
 * sendError(res, 404, "User not found", "NOT_FOUND");
 *
 * @example
 * // With validation details:
 * sendError(res, 400, "Validation failed", "VALIDATION_ERROR", [
 *   { field: "email", message: "Invalid email format" }
 * ]);
 */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  code?: string,
  details?: unknown
): void {
  const body: ApiErrorBody = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  if (code) {
    body.code = code;
  }

  if (details !== undefined) {
    body.details = details;
  }

  res.status(statusCode).json(body);
}
