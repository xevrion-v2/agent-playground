import type { Response } from "express";

/**
 * Standard shape for API error responses.
 */
export type ApiErrorResponse = {
  status: "error";
  error: {
    code: string;
    message: string;
  };
};

/**
 * Send a standardized error response to the client.
 *
 * @param res - The Express response object.
 * @param statusCode - The HTTP status code to return.
 * @param code - A machine-readable error code (e.g. "VALIDATION_ERROR").
 * @param message - A human-readable error message.
 * @returns The Express response for chaining.
 */
export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string
): Response {
  const body: ApiErrorResponse = {
    status: "error",
    error: {
      code,
      message
    }
  };
  return res.status(statusCode).json(body);
}

/**
 * Send a 400 Bad Request response for validation failures.
 *
 * @param res - The Express response object.
 * @param message - A description of what failed validation.
 * @returns The Express response for chaining.
 */
export function sendValidationError(res: Response, message: string): Response {
  return sendError(res, 400, "VALIDATION_ERROR", message);
}

/**
 * Send a 404 Not Found response when a resource does not exist.
 *
 * @param res - The Express response object.
 * @param resource - The name of the resource that was not found.
 * @returns The Express response for chaining.
 */
export function sendNotFound(res: Response, resource: string): Response {
  return sendError(res, 404, "NOT_FOUND", `${resource} not found.`);
}

/**
 * Send a 500 Internal Server Error response for unexpected failures.
 *
 * @param res - The Express response object.
 * @param message - Optional detail about the internal error.
 * @returns The Express response for chaining.
 */
export function sendInternalError(res: Response, message = "An unexpected error occurred."): Response {
  return sendError(res, 500, "INTERNAL_ERROR", message);
}
