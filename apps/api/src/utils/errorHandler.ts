import { Response } from "express";

export function sendError(res: Response, message: string, statusCode: number = 400) {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
}
