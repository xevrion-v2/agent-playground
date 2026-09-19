import { Response } from 'express';

interface ErrorPayload {
  message: string;
  error?: string;
  statusCode: number;
  details?: any;
}

export const sendApiErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  details?: any
): Response => {
  const payload: ErrorPayload = {
    message,
    statusCode,
    ...(details && { details })
  };
  
  return res.status(statusCode).json(payload);
};

export default sendApiErrorResponse;