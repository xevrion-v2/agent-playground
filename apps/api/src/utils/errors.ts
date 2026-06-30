import { Response } from "express";

export type HttpStatus = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 503;

export interface ApiErrorResponse {
  error: string;
  status: HttpStatus;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly status: HttpStatus;
  public readonly details?: unknown;

  constructor(status: HttpStatus, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }

  static badRequest(message = "Bad request", details?: unknown): ApiError {
    return new ApiError(400, message, details);
  }

  static notFound(message = "Resource not found", details?: unknown): ApiError {
    return new ApiError(404, message, details);
  }

  static internal(message = "Internal server error", details?: unknown): ApiError {
    return new ApiError(500, message, details);
  }

  static unauthorized(message = "Unauthorized", details?: unknown): ApiError {
    return new ApiError(401, message, details);
  }
}

export function sendError(res: Response, error: ApiError): void {
  const body: ApiErrorResponse = {
    error: error.message,
    status: error.status,
  };
  if (error.details !== undefined) {
    body.details = error.details;
  }
  res.status(error.status).json(body);
}
