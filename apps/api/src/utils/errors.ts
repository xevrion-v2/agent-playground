/**
 * Creates a standardized API error response object.
 * @param statusCode HTTP status code
 * @param message Human-readable error description
 * @returns A plain object with error, status, and message fields
 */
export function apiError(statusCode: number, message: string): { error: true; status: number; message: string } {
  return {
    error: true,
    status: statusCode,
    message,
  };
}