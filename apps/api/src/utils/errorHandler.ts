import { Request, Response, NextFunction } from 'express';

export const handleApiError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  res.status(500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
    }
  });
};

export const withErrorHandling = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const errorResponse = handleApiError(error);
      res.status(500).json({ error: errorResponse });
    }
  };
};