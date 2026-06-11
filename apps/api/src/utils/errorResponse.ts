// Simple API error response helper
export interface ApiErrorResponse {
  error: true;
  message: string;
  statusCode: number;
}

export function errorResponse(message: string, statusCode = 500): ApiErrorResponse {
  return { error: true, message, statusCode };
}
