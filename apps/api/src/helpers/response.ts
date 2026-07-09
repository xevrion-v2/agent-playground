import { Response } from "express";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR";

const STATUS_MAP: Record<ApiErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

/**
 * Send a structured JSON error response.
 *
 * @example
 * sendError(res, "NOT_FOUND", "User not found");
 * // → HTTP 404 { error: "NOT_FOUND", message: "User not found" }
 */
export function sendError(
  res: Response,
  code: ApiErrorCode,
  message: string
): void {
  const status = STATUS_MAP[code] ?? 500;
  res.status(status).json({ error: code, message });
}

/**
 * Send a structured JSON success response.
 *
 * @example
 * sendOk(res, { id: "123" }, "Created", 201);
 * // → HTTP 201 { data: { id: "123" }, message: "Created" }
 */
export function sendOk<T>(
  res: Response,
  data: T,
  message = "OK",
  status = 200
): void {
  res.status(status).json({ data, message });
}
