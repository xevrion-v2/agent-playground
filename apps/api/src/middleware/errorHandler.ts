import { Request, Response, NextFunction } from 'express';
import { sendApiError } from '../utils/errorHelper';

// Update existing error handling middleware or create a simple error handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error('API Error:', err);
  
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: {
        message: err.message || 'Internal Server Error',
        stack: err.stack
      }
    });
  }
  
  return res.status(500).json({
    error: {
      message: 'Internal server error'
    }
  });
};