import { Response } from "express";

/**
 * Send a standardized API error response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code (default 500)
 * @param message - Human-readable error description
 */
export function sendError(
  res: Response,
  statusCode: number = 500,
  message: string = "Internal Server Error"
): void {
  res.status(statusCode).json({
    error: true,
    status: statusCode,
    message,
  });
}
