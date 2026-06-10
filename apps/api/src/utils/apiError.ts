import { Response } from 'express';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export const sendErrorResponse = (res: Response, error: APIError) => {
  return res.status(error.statusCode).json({
    success: false,
    error: error.message,
    statusCode: error.statusCode
  });
};