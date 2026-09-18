import { Router } from 'express';
import { piController } from '../controllers/pi.controller';

const router = Router();

/**
 * GET /api/pi
 * Calculate and return PI with metadata
 */
router.get('/pi', piController.getPi);

export default router;