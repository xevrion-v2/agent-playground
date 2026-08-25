import { Response } from "express";

/**
 * Standardised API error response helpers.
 * Keep error shapes consistent across all routes.
 */

export interface ApiErrorBody {
  errors: Array<{ message: string; code?: string }>;
  message: string;
}

function sendError(
  res: Response,
  status: number,
  errors: Array<{ message: string; code?: string }>,
  summary: string,
): void {
  res.status(status).json({ errors, message: summary });
}

/** 400 — malformed request body, missing fields, invalid types */
export function badRequest(
  res: Response,
  errors: Array<string | { message: string; code?: string }>,
): void {
  const normalised = errors.map((e) =>
    typeof e === "string" ? { message: e } : e,
  );
  sendError(res, 400, normalised, "Bad request.");
}

/** 404 — resource not found */
export function notFound(
  res: Response,
  resource = "Resource",
): void {
  sendError(res, 404, [{ message: `${resource} not found.` }], "Not found.");
}

/** 409 — conflict (duplicate, state mismatch, etc.) */
export function conflict(
  res: Response,
  detail: string,
): void {
  sendError(res, 409, [{ message: detail }], "Conflict.");
}

/** 422 — validation failed */
export function validationFailed(
  res: Response,
  errors: string[],
): void {
  sendError(
    res,
    422,
    errors.map((e) => ({ message: e })),
    "Validation failed.",
  );
}

/** 500 — unexpected server error */
export function internalError(
  res: Response,
  detail = "An unexpected error occurred.",
): void {
  sendError(res, 500, [{ message: detail }], "Internal server error.");
}
