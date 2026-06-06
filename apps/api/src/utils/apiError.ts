export interface ApiErrorResponse {
  error: string;
  statusCode: number;
}

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const apiError = (res: any, message: string, statusCode: number = 500) => {
  return res.status(statusCode).json({
    error: message,
    statusCode,
  } as ApiErrorResponse);
};