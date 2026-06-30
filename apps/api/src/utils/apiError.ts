/**
 * Standardized API error response helper.
 * Provides a consistent shape for error responses across the Express app.
 */

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    statusCode: number;
  };
}

export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string
): ApiErrorResponse {
  return {
    success: false,
    error: {
      message,
      statusCode,
      ...(code && { code }),
    },
  };
}

export function sendApiError(
  res: any,
  message: string,
  statusCode: number = 500,
  code?: string
): void {
  res.status(statusCode).json(createApiError(message, statusCode, code));
}