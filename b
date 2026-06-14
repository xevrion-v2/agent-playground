export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
  };
}

export function createErrorResponse(error: ApiError | Error): ErrorResponse {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  return {
    success: false,
    error: {
      message: error.message,
      statusCode,
    },
  };
}

export default ApiError;