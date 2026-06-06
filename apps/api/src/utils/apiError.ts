interface ApiErrorOptions {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, any>;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: Record<string, any>;

  constructor(options: ApiErrorOptions, status: number = 500) {
    super(options.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = options.code || 'API_ERROR';
    this.details = options.details;
  }
}