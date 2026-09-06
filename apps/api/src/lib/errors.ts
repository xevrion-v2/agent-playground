/**
 * Standardized API error response helper.
 * Related to issue #7
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Creates a standardized error response object.
 * @param code - Machine-readable error code (e.g., "VALIDATION_ERROR")
 * @param message - Human-readable error description
 * @param details - Optional additional context
 */
export function createApiError(
  code: string,
  message: string,
  details?: unknown
): ApiError {
  return {
    error: {
      code,
      message,
      ...(details !== undefined && { details }),
    },
  };
}

/**
 * Sends a standardized error response via Express res.
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param code - Machine-readable error code
 * @param message - Human-readable error description
 * @param details - Optional additional context
 */
export function sendApiError(
  res: import("express").Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown
): void {
  res.status(statusCode).json(createApiError(code, message, details));
}
