import { Response } from 'express';

export const sendApiErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  details?: any
) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details })
  });
};

export default sendApiErrorResponse;