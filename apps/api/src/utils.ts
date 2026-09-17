import { Response } from "express";

export function sendError(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({
    status: "error",
    error: {
      message
    }
  });
}
