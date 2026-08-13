import { Response } from "express";

/**
 * Send a standardized error response.
 *
 * @param res - Express response object
 * @param status - HTTP status code
 * @param message - Human-readable error description
 */
export function apiError(res: Response, status: number, message: string) {
  return res.status(status).json({
    status: "error",
    error: { message },
  });
}

/**
 * Send a standardized success response with typed data.
 *
 * @param res - Express response object
 * @param data - Response payload
 * @param status - HTTP status code (default 200)
 */
export function apiSuccess<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({
    status: "success",
    data,
  });
}
