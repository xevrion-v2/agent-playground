import { Response } from "express";

/**
 * Represents an API error with an HTTP status code.
 *
 * Use the static factory methods for common error types
 * or construct directly for custom status codes.
 *
 * @example
 * ```ts
 * throw ApiError.notFound("User not found");
 * throw ApiError.badRequest("Invalid email format");
 * throw new ApiError(409, "Email already exists");
 * ```
 */
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }

  /** 400 Bad Request */
  static badRequest(message = "Bad request"): ApiError {
    return new ApiError(400, message);
  }

  /** 401 Unauthorized */
  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(401, message);
  }

  /** 403 Forbidden */
  static forbidden(message = "Forbidden"): ApiError {
    return new ApiError(403, message);
  }

  /** 404 Not Found */
  static notFound(message = "Resource not found"): ApiError {
    return new ApiError(404, message);
  }

  /** 409 Conflict */
  static conflict(message = "Resource already exists"): ApiError {
    return new ApiError(409, message);
  }

  /** 500 Internal Server Error */
  static internal(message = "Internal server error"): ApiError {
    return new ApiError(500, message);
  }
}

/**
 * Sends a standardized JSON error response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param message - Human-readable error message
 */
export function sendErrorResponse(
  res: Response,
  statusCode: number,
  message: string
): void {
  res.status(statusCode).json({
    status: "error",
    error: {
      code: statusCode,
      message
    }
  });
}
