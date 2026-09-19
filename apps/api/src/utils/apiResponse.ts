import { Response } from 'express';

export const sendApiError = (
  res: Response,
  statusCode: number,
  message: string,
  details?: any
) => {
  return res.status(statusCode).json({
    success: false,
    error: true,
    message,
    ...(details && { details })
  });
};

export const sendApiResponse = (
  res: Response,
  data: any
) => {
  return res.status(200).json({ success: true, data });
};