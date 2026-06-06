import { Response } from 'express';

export interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code: string;
  };
}

export const createErrorResponse = (success: boolean, message: string, code: string = 'INTERNAL_ERROR'): ErrorResponse => {
  return {
    success: success,
    error: {
      message,
      code
    }
  };
};

export const sendApiError = (res: any, message: string, code: string = 'INTERNAL_ERROR') => {
  return res.status(400).json({error: message, code: code});
};