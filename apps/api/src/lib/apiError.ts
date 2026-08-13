/**
 * Sends a JSON error response with a consistent envelope shape.
 *
 * @example
 * apiError(res, 400, "Validation failed.", { field: ["Required"] });
 */
import type { Response } from "express";

export function apiError(
  res: Response,
  statusCode: number,
  message: string,
  details?: Record<string, unknown>
): void {
  const body: Record<string, unknown> = { error: message };
  if (details !== undefined) {
    body.details = details;
  }
  res.status(statusCode).json(body);
}
