import { Request, Response, NextFunction } from "express";

// ---------------------------------------------------------------------------
// Typed error classes
// ---------------------------------------------------------------------------

/** Base application error — extend this for domain-specific errors. */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_ERROR",
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/** 400 — The request body, params, or query is invalid. */
export class ValidationError extends AppError {
  public readonly details: unknown;

  constructor(message: string, details?: unknown) {
    super(message, 400, "VALIDATION_ERROR");
    this.details = details ?? null;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/** 401 — Missing or invalid authentication credentials. */
export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401, "UNAUTHORIZED");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/** 403 — Authenticated but not permitted. */
export class ForbiddenError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403, "FORBIDDEN");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/** 404 — The requested resource does not exist. */
export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/** 409 — Conflict with current state (e.g. duplicate entry). */
export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409, "CONFLICT");
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/** 429 — Too many requests (rate limit). */
export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests, please try again later") {
    super(message, 429, "TOO_MANY_REQUESTS");
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

// ---------------------------------------------------------------------------
// Error-handling middleware
// ---------------------------------------------------------------------------

export type ErrorResponseBody = {
  status: "error";
  code: string;
  message: string;
  details?: unknown;
  /** Stack trace included only in development mode. */
  stack?: string;
};

/**
 * Express error-handling middleware.
 *
 * Place this **after** all route handlers in your Express app:
 *
 * ```ts
 * import { errorHandler } from "./middleware/errorHandler";
 * app.use(errorHandler);
 * ```
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // ------------------------------------------------------------------
  // Known operational errors (thrown by our code)
  // ------------------------------------------------------------------
  if (err instanceof AppError) {
    const body: ErrorResponseBody = {
      status: "error",
      code: err.code,
      message: err.message,
    };

    if (err instanceof ValidationError && err.details) {
      body.details = err.details;
    }

    if (process.env.NODE_ENV === "development") {
      body.stack = err.stack;
    }

    res.status(err.statusCode).json(body);
    return;
  }

  // ------------------------------------------------------------------
  // Unknown / programmer errors — log and return generic 500
  // ------------------------------------------------------------------
  console.error("[unhandled]", err);

  const body: ErrorResponseBody = {
    status: "error",
    code: "INTERNAL_ERROR",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message || "An unexpected error occurred",
  };

  if (process.env.NODE_ENV === "development") {
    body.stack = err.stack;
  }

  res.status(500).json(body);
}

// ---------------------------------------------------------------------------
// Async wrapper — catches rejected promises in async route handlers
// ---------------------------------------------------------------------------

/**
 * Wraps an async Express route handler so that rejected promises are
 * forwarded to `next()`, where `errorHandler` can pick them up.
 *
 * Usage:
 * ```ts
 * router.get("/tasks", asyncHandler(async (req, res) => { ... }));
 * ```
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
