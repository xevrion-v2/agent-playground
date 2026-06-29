export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  data: T;
}

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    status: 'success',
    data,
  };
}

export function errorResponse(message: string, details?: unknown): ApiResponse<{ message: string; details?: unknown }> {
  return {
    status: 'error',
    data: {
      message,
      ...(details !== undefined && { details }),
    },
  };
}