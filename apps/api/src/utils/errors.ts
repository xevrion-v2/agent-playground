import type { Response } from "express";

/**
 * Sends a structured JSON error response.
 *
 * @example
 *   errorResponse(res, 400, "Missing required fields");
 *   // { error: { status: 400, message: "Missing required fields" } }
 */
export function errorResponse(
  res: Response,
  statusCode: number,
  message: string
): void {
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  });
}
