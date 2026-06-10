import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  code?: string;
  status: number;
  timestamp: string;
}

export const handleApiError = (error: Error): ErrorResponse => {
  return {
    message: error.message,
    code: error.name,
    status: 500,
    timestamp: new Date().toISOString(),
  };
};

export const handleApiErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  const errorResponse = handleApiError(err);
  return errorResponse;
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