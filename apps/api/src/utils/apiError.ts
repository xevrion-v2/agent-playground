export class APIError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

export function createErrorResponse(error: Error | APIError): ErrorResponse {
  const statusCode = error instanceof APIError ? error.statusCode : 500;
  return {
    success: false,
    error: error.message || 'Internal Server Error',
    statusCode,
  };
}

export function sendError(res: any, error: Error | APIError): void {
  const response = createErrorResponse(error);
  res.status(response.statusCode).json(response);
}