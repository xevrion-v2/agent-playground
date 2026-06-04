import { Response } from "express";

export interface ApiErrorOptions {
  status?: number;
  code?: string;
  details?: any;
}

export const sendError = (
  res: Response,
  message: string,
  options: ApiErrorOptions = {}
) => {
  const statusCode = options.status || 500;
  
  // Log server errors for observability
  if (statusCode >= 500) {
    console.error(`[API ERROR 500]: ${message}`, options.details || "");
  }

  // Prevent leaking internal system error details in production environments
  const details = process.env.NODE_ENV === "development" ? options.details : null;

  return res.status(statusCode).json({
    status: "error",
    error: {
      message,
      code: options.code || "INTERNAL_SERVER_ERROR",
      details: details || null,
    },
  });
};
