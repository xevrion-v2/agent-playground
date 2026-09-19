import { Response } from 'express';

interface ApiErrorResponse {
  success: boolean;
  error: {
    message: string;
    statusCode: number;
    timestamp: string;
  };
}

/**
 * Send a standardized API error response
 * @param res Express Response object
 * @param message Error message to send
 *param statusCode HTTP status code, defaults to 500
 * @returns Express Response object with JSON error payload
 */
export const sendApiError = (res: Response, message: string, statusCode: number = 500) => {
  const errorResponse: ApiErrorResponse = {
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
    },
  };
  
  return res.status(statusCode).json(errorResponse);
};