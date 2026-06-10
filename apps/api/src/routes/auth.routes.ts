import { sendApiError } from '../utils/apiHelpers';
import { Request, Response } from 'express';

// Example of using the helper in an auth route
// (This is a simplified example - in a real implementation we'd integrate with actual route handlers)
const exampleErrorHandler = (req: Request, res: Response, next: Function) => {
  try {
    // Some operation that might fail
    throw new Error('Example error');
  } catch (error: any) {
    return sendApiError(res, 'Authentication failed', 401);
  }
};