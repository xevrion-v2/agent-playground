import { Request, Response, NextFunction } from 'express';

export const apiError = (error: any): any => {
  return {
    message: error.message || 'Internal Server Error',
    code: error.code || 'API_ERROR',
    status: error.status || 500,
    timestamp: new Date().toISOString()
  };
};

export const handleApiError = (error: any) => {
  return apiError(error);
};