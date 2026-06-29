import { Router } from 'express';
import { successResponse } from '../utils/response';

const router router = Router();

router.get('/', (_req, res) => {
  res.json(successResponse({
    message: 'Service is healthy'
  }));
});

export default router;