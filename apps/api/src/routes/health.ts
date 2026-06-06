import { Router, Request, Response } from 'express';
import { ApiError, createErrorResponse } from '../utils/apiError';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  try {
    const isHealthy = true;
    if (!isHealthy) {
      throw new ApiError(503, 'Service unavailable');
    }
    res.json({ success: true, data: { status: 'ok' } });
  } catch (error) {
    const err = error instanceof ApiError ? error : new ApiError(500, 'Internal server error');
    res.status(err.statusCode).json(createErrorResponse(err));
  }
});

export default router;