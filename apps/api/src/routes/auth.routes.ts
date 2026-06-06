import { Router, Request, Response } from 'express';
import { createAPIError, sendAPIErrorResponse } from '../utils/apiError';

const router = Router();

// Example usage of the error helper
router.post('/example-error', (req: Request, res: Response) => {
  try {
    // Some logic that might fail
    throw createAPIError(400, 'Example error message', 'EXAMPLE_ERROR');
  } catch (error) {
    sendAPIErrorResponse(error, res);
  }
});

export default router;