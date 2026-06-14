import { Router } from 'express';
import { ApiError, sendError } from '../utils/apiError';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    sendError(res, new ApiError('Health check failed', 500, 'HEALTH_CHECK_ERROR'));
  }
});

export default router;