import { Request, Response, NextFunction } from "express";
import { handleAPIError, APIError } from "../utils/apiError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json(handleAPIError(err));
  }

  console.error("Unhandled error:", err);
  return res.status(500).json(handleAPIError(err));
}