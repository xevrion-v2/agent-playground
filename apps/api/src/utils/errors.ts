import { Request, Response, NextFunction } from "express";

/** Standard API error payload. */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/** Centralized error response helper. */
export function apiError(res: Response, status: number, error: ApiError): void {
  res.status(status).json(error);
}

/** Wrapper for 400 Bad Request. */
export function badRequest(res: Response, message: string, details?: unknown): void {
  apiError(res, 400, { code: "BAD_REQUEST", message, details });
}

/** Wrapper for 500 Internal Server Error. */
export function serverError(res: Response, message = "Internal server error"): void {
  apiError(res, 500, { code: "INTERNAL_ERROR", message });
}
