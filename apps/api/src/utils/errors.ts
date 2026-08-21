export interface ApiErrorOptions {
  status?: number;
  message: string;
  code?: string;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.status = options.status ?? 500;
    this.code = options.code ?? "INTERNAL_ERROR";
    this.details = options.details;
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError({ status: 400, message, code: "BAD_REQUEST", details });
  }

  static unauthorized(message: string = "Unauthorized", details?: unknown) {
    return new ApiError({ status: 401, message, code: "UNAUTHORIZED", details });
  }

  static forbidden(message: string = "Forbidden", details?: unknown) {
    return new ApiError({ status: 403, message, code: "FORBIDDEN", details });
  }

  static notFound(message: string = "Resource not found", details?: unknown) {
    return new ApiError({ status: 404, message, code: "NOT_FOUND", details });
  }

  static internal(message: string = "Internal server error", details?: unknown) {
    return new ApiError({ status: 500, message, code: "INTERNAL_ERROR", details });
  }

  toResponse() {
    return {
      status: "error",
      error: {
        code: this.code,
        message: this.message,
        ...(this.details !== undefined && { details: this.details })
      }
    };
  }
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toResponse());
  }

  console.error("Unhandled error:", err);
  return res.status(500).json(
    new ApiError({ message: "Internal server error" }).toResponse()
  );
}

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}