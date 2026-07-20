import { Response } from 'express';

interface ApiErrorHelper {
  message: string;
  statusCode?: number;
  error?: string;
}

export const sendApiError = (res: any, message: string, statusCode: number = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode
    }
  });
};

export const sendApiSuccess = (res: any, data: any, successMessage: string = 'success') => {
  return res.json({
    success: true,
    message: successMessage,
    data: data || {}
  });
};

// Helper function that can be used for consistent error responses across API endpoints
export const sendError = (res: any, message: string, statusCode: number = 400) => {
  return sendApiError(res, message, statusCode);
};