import type { Response } from "express";

export function apiError(res: Response, status: number, message: string) {
  return res.status(status).json({
    status: "error",
    error: { message },
  });
}

export function apiOk<T>(res: Response, status: number, data: T, message?: string) {
  return res.status(status).json({
    status: "ok",
    data,
    ...(message ? { message } : {}),
  });
}
