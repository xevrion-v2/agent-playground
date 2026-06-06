import { Response } from 'express';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
  };
  status: number;
}

export const sendApiError = (
  res: Response,
  message: string,
  status: number = 500
): Response => {
  return res.status(status).json({
    success: false,
    error: {
      message
    },
    status
  });
};

export const createApiError = (
  message: string,
  status: number = 500
): ErrorResponse => ({
  success: false,
  error: {
    message
  },
  status
});