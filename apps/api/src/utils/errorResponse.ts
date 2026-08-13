/**
 * #7 — API error response helper
 *
 * Returns a consistent error envelope across all API endpoints.
 *
 * @param status  HTTP status code
 * @param message Human-readable error description
 * @returns       Shaped error response object
 */
export function errorResponse(status: number, message: string) {
  return {
    status,
    error: {
      code: status,
      message,
    },
  };
}
