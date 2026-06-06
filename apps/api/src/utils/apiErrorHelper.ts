import { Response } from 'express';

interface ApiErrorResponse {
  success: boolean;
  error: {
    message: string;
    code?: string;
  };
  status: number;
}

export const sendApiError = (
  res: Response,
  message: string,
  status: number = 500,
  code?: string
): Response => {
  return res.status(status).json({
    success: false,
    error: {
      message,
      ...(code && { code })
    },
    status
  });
};

export const sendApiSuccess = (
  res: Response,
  data: any,
  status: number = 200
): Response => {
  return res.status(status).json({ success: true, data });
};