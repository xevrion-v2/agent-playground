import type { Response } from "express";

export type ApiErrorShape = {
  error: "error";
  message: string;
  details?: unknown;
};

/**
 * Write a consistent JSON error envelope to the response.
 *
 * @param res - The Express response to write to.
 * @param status - HTTP status code to send.
 * @param message - Human-readable error message (safe to expose to clients).
 * @param details - Optional structured details. Avoid leaking secrets here.
 * @returns The same `res` for chaining.
 */
export function sendError(
  res: Response,
  status: number,
  message: string,
  details?: unknown
): Response {
  const body: ApiErrorShape = { error: "error", message };
  if (details !== undefined) {
    body.details = details;
  }
  return res.status(status).json(body);
}
