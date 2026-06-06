import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const apiError = (res: Response, statusCode: number, message: string, details?: any) => {
  return res.status(statusCode).json({
    error: {
      message,
      ...(details && { details })
    });
};