import { Router } from 'express';
import { errorResponse } from '../utils/apiError';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    return errorResponse(res, 500, 'Health check failed');
  }
});

export default router;
