import type { ErrorRequestHandler } from "express";

type ErrorWithStatus = Error & {
  status?: number;
  statusCode?: number;
};

export const errorHandler: ErrorRequestHandler = (
  err: ErrorWithStatus,
  _req,
  res,
  _next,
) => {
  const status = err.statusCode ?? err.status ?? 500;
  const safeStatus = status >= 400 && status < 600 ? status : 500;

  res.status(safeStatus).json({
    error: safeStatus === 500 ? "Internal server error" : err.message,
  });
};

export default errorHandler;