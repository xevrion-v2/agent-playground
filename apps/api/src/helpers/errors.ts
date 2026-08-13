/**
 * API error response helper for consistent error handling.
 * Returns a standardized JSON error response with appropriate HTTP status code.
 */

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

/**
 * Creates a standardized API error response.
 * @param statusCode - HTTP status code (e.g. 400, 404, 500)
 * @param message - Human-readable error description
 * @returns Express response with JSON error body
 */
export function sendError(res: any, statusCode: number, message: string): void {
  res.status(statusCode).json({
    error: getErrorLabel(statusCode),
    message,
    statusCode,
  });
}

/**
 * Returns a short label for common HTTP error status codes.
 */
function getErrorLabel(code: number): string {
  const labels: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };
  return labels[code] || `Error ${code}`;
}
