import type { Response } from "express";

export function sendApiError(res: Response, status: number, message: string) {
  return res.status(status).json({
    error: {
      message
    }
  });
}
