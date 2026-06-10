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
  public code: string;

  constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
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

export const sendError = (res: any, error: ApiError | Error): void => {
  if (error instanceof ApiError) {
    res.status(error.status).json(error.toJSON());
  } else {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Internal Server Error',
        status: 500,
      },
    });
  }
};

export default ApiError;