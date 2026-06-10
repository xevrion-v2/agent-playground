import { Response } from "express";

/**
 * Send a standardised JSON error response.
 *
 * @param res     Express response object
 * @param status  HTTP status code
 * @param message Human-readable error message
 */
export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({ error: message });
}
