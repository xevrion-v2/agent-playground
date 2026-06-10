import { Router } from 'express';
import { sendError } from '../utils/apiError';

const router = Router();

router.get('/health', (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'OK' });
  } catch (error) {
    sendError(res, 500, 'Internal server error');
  }
});

export default router;
