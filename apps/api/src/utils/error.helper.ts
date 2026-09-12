import { Response } from 'express';

interface APIError {
  message: string;
  statusCode: number;
  details?: any;
}

export const sendAPIError = (res: Response, message: string, statusCode: number = 500, details?: any) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(details && { details })
    }
  });
};

export default sendAPIError;