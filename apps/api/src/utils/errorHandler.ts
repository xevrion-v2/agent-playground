import { Response } from 'express';

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

export const sendApiError = (
  res: Response,
  message: string,
  status: number = 400,
  code?: string,
  details?: any
): void => {
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message,
      ...(code && { code }),
      ...(details && { details })
    }
  };
  
  res.status(status).json(errorResponse);
};