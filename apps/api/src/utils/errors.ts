import { Response } from "express";

export interface ApiErrorOptions {
  status?: number;
  error?: string;
  details?: any;
}

/**
 * Sends a standardized JSON error response.
 * 
 * @param res Express response object
 * @param message Human-readable error message
 * @param options Additional options (status code, error name/type, details)
 */
export function sendError(res: Response, message: string, options: ApiErrorOptions = {}) {
  const status = options.status || 400;
  return res.status(status).json({
    error: options.error || "Bad Request",
    message,
    details: options.details
  });
}
