import { Response } from "express";

// Standard API error response shape
export interface ApiErrorResponse {
  error: string;
  messages?: string[];
  statusCode: number;
}

// Helper to send consistent error responses
export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  messages?: string[]
): void {
  const response: ApiErrorResponse = {
    error: message,
    statusCode,
    ...(messages && { messages }),
  };
  res.status(statusCode).json(response);
}

// Common error helpers
export function sendBadRequest(res: Response, messages: string[]): void {
  sendError(res, 400, "Validation failed", messages);
}

export function sendNotFound(res: Response, resource: string = "Resource"): void {
  sendError(res, 404, `${resource} not found`);
}

export function sendUnauthorized(res: Response): void {
  sendError(res, 401, "Unauthorized");
}

export function sendForbidden(res: Response): void {
  sendError(res, 403, "Forbidden");
}

export function sendInternalError(res: Response): void {
  sendError(res, 500, "Internal server error");
}
