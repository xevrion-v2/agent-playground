import { Response } from "express";

/**
 * Standard API error response shape.
 */
export interface ApiErrorBody {
  status: "error";
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Sends a consistent JSON error response.
 *
 * @param res     - Express response object
 * @param status  - HTTP status code
 * @param code    - Machine-readable error code (e.g. "VALIDATION_ERROR")
 * @param message - Human-readable error message
 * @param details - Optional additional details (e.g. validation errors)
 */
export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): void {
  const body: ApiErrorBody = {
    status: "error",
    error: { code, message, ...(details !== undefined ? { details } : {}) },
  };
  res.status(status).json(body);
}

/**
 * Shorthand for 400 Bad Request.
 */
export function sendBadRequest(res: Response, message: string, details?: unknown): void {
  sendError(res, 400, "BAD_REQUEST", message, details);
}

/**
 * Shorthand for 404 Not Found.
 */
export function sendNotFound(res: Response, message = "Resource not found"): void {
  sendError(res, 404, "NOT_FOUND", message);
}

/**
 * Shorthand for 500 Internal Server Error.
 */
export function sendInternalError(res: Response, message = "Internal server error"): void {
  sendError(res, 500, "INTERNAL_ERROR", message);
}