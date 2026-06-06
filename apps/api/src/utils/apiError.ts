interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    status: number;
  };
}

export class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError";
  }

  toJSON(): ApiErrorResponse {
    return {
      success: false,
      error: {
        message: this.message,
        code: this.code,
        status: this.status,
      },
    };
  }
}

export function createErrorResponse(message: string, status: number = 500, code?: string): ApiErrorResponse {
  return {
    success: false,
    error: {
      message,
      code,
      status,
    },
  };
}

export function sendError(res: any, message: string, status: number = 500, code?: string): void {
  res.status(status).json(createErrorResponse(message, status, code));
}

export { ApiErrorResponse };