import { Router, Request, Response } from 'express';
import { sendApiError } from '../utils/apiError';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({ success: true, status: 'ok' });
});

router.get('/health/error', (_req: Request, res: Response) => {
  // Demonstrate the API error helper in a route
  sendApiError(res, 'Simulated health check failure', 503, 'HEALTH_CHECK_FAILED');
});

export default router;