import { Response } from "express";

/**
 * Supported HTTP error status codes for API error responses.
 * @typedef {400 | 401 | 403 | 404 | 409 | 422 | 500} ErrorCode
 */

/**
 * Sends a standardized JSON error response.
 *
 * Usage:
 *   errorResponse(res, 404, "User not found");
 *   errorResponse(res, 422, "Validation failed", { field: "email" });
 *
 * @param {Response} res - Express response object.
 * @param {number} statusCode - HTTP status code (400-599).
 * @param {string} message - Human-readable error description.
 * @param {Record<string, unknown>} [details] - Optional extra error context.
 * @returns {void}
 */
export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  details?: Record<string, unknown>
): void {
  res.status(statusCode).json({
    status: "error" as const,
    error: {
      code: statusCode,
      message,
      ...(details && { details })
    }
  });
}
