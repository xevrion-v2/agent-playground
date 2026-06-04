import { Response } from "express";

/**
 * Standard API error response shape.
 */
export interface ApiError {
  error: string;
  message?: string;
  details?: unknown;
}

/**
 * Standard API success response shape.
 */
export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

/**
 * Send a standardized error response.
 *
 * @param res   - Express response object.
 * @param status - HTTP status code.
 * @param error  - Short error label (e.g. "Not Found").
 * @param message - Optional human-readable message.
 */
export function sendError(
  res: Response,
  status: number,
  error: string,
  message?: string
): void {
  res.status(status).json({ error, message });
}

/**
 * Send a standardized success response.
 *
 * @param res     - Express response object.
 * @param status  - HTTP status code.
 * @param data    - Response payload.
 * @param message - Optional human-readable message.
 */
export function sendSuccess<T>(
  res: Response,
  status: number,
  data: T,
  message?: string
): void {
  res.status(status).json({ data, message });
}

/** 400 Bad Request */
export function badRequest(res: Response, message = "Bad request") {
  sendError(res, 400, "Bad Request", message);
}

/** 404 Not Found */
export function notFound(res: Response, message = "Resource not found") {
  sendError(res, 404, "Not Found", message);
}

/** 500 Internal Server Error */
export function internalError(res: Response, message = "Internal server error") {
  sendError(res, 500, "Internal Server Error", message);
}
