import type { Response } from "express";

interface ApiErrorResponse {
  status: "error";
  data: {
    code: number;
    message: string;
  };
}

/**
 * Standardized API error response helper.
 *
 * Sends a consistent JSON envelope for all errors:
 *   { "status": "error", "data": { "code": 400, "message": "..." } }
 *
 * @example
 *   apiError(res, 400, "Email is required");
 *   apiError(res, 404, "User not found");
 *   apiError(res, 500, "Internal server error");
 */
export function apiError(res: Response, code: number, message: string): void {
  res.status(code).json({
    status: "error",
    data: { code, message },
  } satisfies ApiErrorResponse);
}
