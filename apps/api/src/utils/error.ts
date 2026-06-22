import { Response } from "express";

/**
 * Standardized API error response helper
 */
export function sendApiError(res: Response, statusCode: number, message: string, details?: any) {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(details && { details })
    }
  });
}
