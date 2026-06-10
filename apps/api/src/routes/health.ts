import { Router } from 'express';
import { sendError } from '../utils/apiError';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/error', (_req, res) => {
  // Example route demonstrating the API error helper
  sendError(res, 'Something went wrong', 500, 'INTERNAL_ERROR');
});

export default router;
