import { Request, Response } from 'express';
import { apiError } from '../utils/errorHandler';

// Example of using the helper in a route
export const register = (req: Request, res: Response) => {
  try {
    // Registration logic would be here
    // ...
  } catch (error) {
    if (error instanceof Error) {
      apiError(res, 500, 'Registration failed', error.message);
      return;
    }
  }
};