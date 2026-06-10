export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

export function createErrorResponse(
  statusCode: number,
  message: string,
  details?: Record<string, any>
): ErrorResponse {
  return {
    error: 'API Error',
    message,
    statusCode,
    details,
  };
}