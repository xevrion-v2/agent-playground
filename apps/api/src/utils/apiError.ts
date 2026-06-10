import { Response } from 'express';

interface ApiError {
  message: string;
  code: string;
  status: number;
}

export const sendApiError = (res: Response, message: string, code: string = 'INTERNAL_ERROR', status: number = 500): void => {
  res.status(status).json({ error: { message, code, status } });
};
