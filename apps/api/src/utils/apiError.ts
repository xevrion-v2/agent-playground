/**
 * API Error response helper for Express
 */

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    statusCode: number;
  };
}

export class ApiError extends Error {
  public statusCode: number;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'ApiError';
  }
}

export function createErrorResponse(message: string, statusCode: number = 500, code?: string): ApiErrorResponse {
  return {
    success: false,
    error: { message, code, statusCode },
  };
}

export function sendError(res: any, message: string, statusCode: number = 500, code?: string): void {
  res.status(statusCode).json(createErrorResponse(message, statusCode, code));
}