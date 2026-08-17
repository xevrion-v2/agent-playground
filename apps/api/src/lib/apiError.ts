import type { Response } from "express";

type ErrorBody = {
  status: "error";
  error: string;
  data: null;
};

export function sendApiError(res: Response, status: number, message: string) {
  const body: ErrorBody = {
    status: "error",
    error: message,
    data: null,
  };
  return res.status(status).json(body);
}
