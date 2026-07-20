import { Response } from "express";

/**
 * Send a standardized error response.
 *
 * @param res   Express Response object
 * @param status HTTP status code
 * @param message Human-readable error message
 * @param details Optional additional detail for development
 */
export function sendError(
  res: Response,
  status: number,
  message: string,
  details?: string
): void {
  const body: Record<string, unknown> = {
    status: "error",
    error: { message },
  };

  if (details && process.env.NODE_ENV === "development") {
    (body.error as Record<string, unknown>).details = details;
  }

  res.status(status).json(body);
}
