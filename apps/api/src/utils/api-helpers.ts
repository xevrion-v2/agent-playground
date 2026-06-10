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

export const sendApiSuccess = (
  res: Response,
  data: any,
  message: string = 'success'
) => {
  res.json({
    success: true,
    message,
    data
  });
};