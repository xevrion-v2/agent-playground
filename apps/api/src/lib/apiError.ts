/**
 * Shared API error response helper.
 *
 * Produces a consistent JSON error envelope so every route returns the same
 * shape: `{ error: { message, code? }, status }`.
 */
export type ApiErrorShape = {
  error: { message: string; code?: string };
  status: number;
};

export function apiError(
  res: import("express").Response,
  status: number,
  message: string,
  code?: string,
): import("express").Response {
  return res.status(status).json({
    error: { message, ...(code ? { code } : {}) },
    status,
  });
}
