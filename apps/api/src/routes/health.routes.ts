import { Router } from 'express';
import { successResponse } from '../utils/response';

const router = Router();

router.get('/', (_req, res) => {
  res.json(successResponse({
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }));
});

export default router;