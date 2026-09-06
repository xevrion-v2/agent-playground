/**
 * Standard error response helper for the TaskFlow API.
 * 
 * Creates a consistent error response shape across all routes.
 * 
 * @param statusCode - HTTP status code (e.g., 400, 404, 500)
 * @param message - Human-readable error message
 * @param details - Optional additional error context
 */
export function errorResponse(
  statusCode: number,
  message: string,
  details?: Record<string, any>
) {
  return {
    status: "error",
    error: {
      code: statusCode,
      message,
      ...(details && { details })
    }
  };
}
