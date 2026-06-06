export class APIError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors: string[];

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    errors: string[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
  }
}

export const apiError = (
  message: string,
  statusCode: number,
  errors: string[] = []
) => {
  return new APIError(
    message,
    statusCode,
    true, // isOperational
    errors
  );
};