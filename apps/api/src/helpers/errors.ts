import { Response } from "express";

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export function sendError(res: Response, status: number, message: string, details?: unknown): void {
  const body: ApiError = { status, message };
  if (details !== undefined) {
    body.details = details;
  }
  res.status(status).json(body);
}

export function sendBadRequest(res: Response, message: string, details?: unknown): void {
  sendError(res, 400, message, details);
}

export function sendNotFound(res: Response, message: string): void {
  sendError(res, 404, message);
}

export function sendInternalError(res: Response, message: string): void {
  sendError(res, 500, message);
}
