import { Router, Request, Response } from 'express';
import { sendError, ApiError } from '../utils/apiError';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
  } catch (error) {
    sendError(res, 'Health check failed', 500);
  }
});

export default router;