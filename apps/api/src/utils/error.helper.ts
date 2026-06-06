import { Response } from 'express';

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

export const createErrorResponse = (message: string, code: string = 'INTERNAL_ERROR'): ErrorResponse => {
  return {
    success: false,
    error: {
      message,
      code
    }
  };
};

export const sendApiError = (res: Response, message: string, code: string = 'INTERNAL_ERROR') => {
  return res.status(400).json(createErrorResponse(message, code));
};