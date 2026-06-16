/**
 * API error response helper for consistent error formatting.
 */

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

export function createError(status: number, message: string, details?: Record<string, unknown>): ApiError {
  return { status, message, details };
}

export function notFound(message = "Resource not found"): ApiError {
  return createError(404, message);
}

export function badRequest(message = "Bad request"): ApiError {
  return createError(400, message);
}

export function internalError(message = "Internal server error"): ApiError {
  return createError(500, message);
}
