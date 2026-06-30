/**
 * Standard API error response shape.
 */
export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * Creates a JSON error response object.
 */
export function errorResponse(error: ApiError) {
  return {
    error: {
      code: error.code,
      message: error.message,
    },
  };
}
