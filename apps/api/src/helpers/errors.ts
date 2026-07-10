import { Response } from "express";

/**
 * Send a consistent API error response.
 *
 * @param res  - Express response object
 * @param statusCode - HTTP status code (e.g. 400, 404, 500)
 * @param message    - Human-readable error description
 */
export function apiError(res: Response, statusCode: number, message: string): void {
  res.status(statusCode).json({
    status: "error",
    error: {
      code: statusCode,
      message,
    },
  });
}
