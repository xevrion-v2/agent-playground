/**
 * Standardized API error response structure.
 */
export interface ApiError {
  status: "error";
  message: string;
  code?: string;
}

/**
 * Creates a standardized API error response object.
 *
 * @param message - Human-readable error description
 * @param code - Optional machine-readable error code
 * @returns A structured API error object
 *
 * @example
 * ```typescript
 * const err = createApiError("User not found", "USER_NOT_FOUND");
 * // { status: "error", message: "User not found", code: "USER_NOT_FOUND" }
 * ```
 */
export function createApiError(message: string, code?: string): ApiError {
  return { status: "error", message, code };
}

/**
 * Express error handler middleware.
 * Catches errors and returns consistent JSON responses.
 */
export function errorHandler(err: Error, _req: unknown, res: any, _next: unknown): void {
  console.error("API Error:", err.message);
  res.status(500).json(createApiError("Internal server error", "INTERNAL_ERROR"));
}
