import { Response } from 'express';

export const sendApiError = (
  res: Response,
  message: string,
  statusCode: number = 400
): void => {
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode
    }
  });
};

export const sendApiErrorMessage = (
  res: any,
  error: string,
  statusCode: number = 400
): void => {
  sendApiError(res, error, statusCode);
};