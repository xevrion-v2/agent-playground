import { Response } from "express";

export function sendError(res: Response, status: number, message: string, details?: string): void {
  const body: Record<string, unknown> = { error: message };
  if (details) body.details = details;
  res.status(status).json(body);
}

export function sendBadRequest(res: Response, message: string): void {
  sendError(res, 400, message);
}

export function sendNotFound(res: Response, message: string = "Not found"): void {
  sendError(res, 404, message);
}

export function sendInternalError(res: Response, message: string = "Internal server error"): void {
  sendError(res, 500, message);
}
