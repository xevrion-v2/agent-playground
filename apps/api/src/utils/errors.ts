import { Response } from "express";

/**
 * Sends a standardized JSON error response.
 * @param res - The Express Response object
 * @param statusCode - HTTP status code
 * @param message - User-friendly error message description
 * @param error - The error type / title (optional, defaults based on status code)
 */
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  error?: string
) {
  const defaultErrors: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
  };

  const errorTitle = error || defaultErrors[statusCode] || "Error";

  return res.status(statusCode).json({
    error: errorTitle,
    message
  });
}
