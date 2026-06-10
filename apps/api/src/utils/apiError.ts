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

export function createErrorResponse(statusCode: number, message: string) {
  return {
    success: false,
    error: {
      statusCode,
      message,
    },
  };
}

export function sendError(res: any, statusCode: number, message: string) {
  const errorResponse = createErrorResponse(statusCode, message);
  return res.status(statusCode).json(errorResponse);
}