import { Response } from "express";

/**
 * Standard API error response helper.
 * Centralizes error formatting so every route uses a consistent envelope:
 *   { error: string, requestId?: string }
 */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  requestId?: string,
): void {
  const body: { error: string; requestId?: string } = { error: message };
  if (requestId) {
    body.requestId = requestId;
  }
  res.status(statusCode).json(body);
}
