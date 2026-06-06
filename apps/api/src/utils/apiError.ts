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

export const errorResponse = (res: any, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const handleApiError = (error: unknown, res: any) => {
  if (error instanceof ApiError) {
    return errorResponse(res, error.statusCode, error.message);
  }

  console.error('Unexpected error:', error);
  return errorResponse(res, 500, 'Internal server error');
};

export default { ApiError, errorResponse, handleApiError };