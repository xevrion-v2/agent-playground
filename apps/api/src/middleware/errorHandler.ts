/**
 * Standardized API error response helper.
 *
 * Produces consistent error envelopes so clients can reliably
 * parse failure details across every route.
 */

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function sendError(
  res: import("express").Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown
): void {
  const body: ApiErrorBody = {
    error: { code, message }
  };
  if (details !== undefined) {
    body.error.details = details;
  }
  res.status(statusCode).json(body);
}