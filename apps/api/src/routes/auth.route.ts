import { Router, Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '../utils/apiError';

const router = Router();

router.post('/test', (req: Request, res: Response, next: NextFunction) => {
  // Example usage of error helper
  res.json(createErrorResponse('Test error', 'TEST_ERROR'));
});

export default router;