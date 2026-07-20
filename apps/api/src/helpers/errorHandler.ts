import { type Response } from "express";

/**
 * Standardized API error response helper.
 *
 * Sends a consistent JSON envelope so that every API error
 * follows the same shape: `{ status: "error", message, ...extra }`.
 */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  extra: Record<string, unknown> = {},
): void {
  res.status(statusCode).json({
    status: "error",
    message,
    ...extra,
  });
}
