import { Router } from 'express';
import { APIError, sendError } from '../utils/apiError';

const router = Router();

router.get('/health', (req, res) => {
  try {
    res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    const apiError = error instanceof Error ? error : new APIError('Health check failed', 500);
    sendError(res, apiError);
  }
});

export default router;
