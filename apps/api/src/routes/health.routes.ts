import { Router } from 'express';
import { successResponse } from '../utils/response';

const router = Router();

router.get('/', (_req, res) => {
  res.json(successResponse({
    healthy: true
  }));
});

export default router;