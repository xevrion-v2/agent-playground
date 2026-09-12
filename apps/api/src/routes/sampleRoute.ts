import { Request, Response, NextFunction } from 'express';
import { apiError } from '../utils/errorHandler';

export const sampleRouteHandler = (req: Request, res: Response) => {
  // Example usage of the error helper
  try {
    // Route logic here
    // ...
  } catch (error) {
    // Before: res.status(500).json({ error: 'Internal server error' });
    // After:
    apiError(res, 500, 'Internal server error', error.message);
    return;
  }
};