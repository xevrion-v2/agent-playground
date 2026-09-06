import { Response } from "express";

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export function sendError(res: Response, error: ApiError): void {
  res.status(error.status).json({
    status: "error",
    error: {
      code: error.code ?? "UNKNOWN_ERROR",
      message: error.message
    }
  });
}

export function notFound(res: Response, message = "Resource not found"): void {
  sendError(res, { status: 404, message, code: "NOT_FOUND" });
}

export function badRequest(res: Response, message = "Bad request"): void {
  sendError(res, { status: 400, message, code: "BAD_REQUEST" });
}
