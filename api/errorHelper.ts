import { Response } from 'express';

interface ErrorResponse {
  error: string;
}

export const sendErrorResponse = (res: Response, error: string): void => {
  res.status(500).json({ error: error });
};