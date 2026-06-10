type ErrorResponse = {
  message: string;
  code?: string;
  status: number;
  timestamp: string;
  requestId?: string;
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: Error, statusCode?: number): ErrorResponse => {
  return {
    message: error.message,
    code: 'API_ERROR',
    status: statusCode || 500,
    timestamp: new Date().toISOString(),
  };
};