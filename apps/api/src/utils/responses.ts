import type { Response } from "express";

export function sendError(res: Response, status: number, message: string): Response {
  return res.status(status).json({
    error: {
      status,
      message
    }
  });
}
