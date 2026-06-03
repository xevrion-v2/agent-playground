import { Response } from "express";

export interface ApiErrorBody {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
}

/**
 * Sends a standardised JSON error response.
 *
 * @param res     - Express Response object
 * @param status  - HTTP status code (e.g. 400, 404, 500)
 * @param message - Human-readable error description
 * @param code    - Machine-readable error code (e.g. "VALIDATION_ERROR")
 */
export function sendApiError(
  res: Response,
  status: number,
  message: string,
  code = "INTERNAL_ERROR"
): void {
  const body: ApiErrorBody = {
    success: false,
    error: { message, code, statusCode: status },
  };
  res.status(status).json(body);
}
