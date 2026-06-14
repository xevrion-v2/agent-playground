import { Request, Response } from 'express';
import { ZodError } from 'zod';

interface ApiError extends Error {
  statusCode?: number;
}

export const apiError = (error: Error | ZodError, req: Request, res: Response) => {
  if (res.headersSent) {
    console.error('Headers already sent, cannot send error response');
    return;
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.issues,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};

export default apiError;