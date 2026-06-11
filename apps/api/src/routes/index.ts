import { Router } from 'express';
import healthRoutes from './health.routes';
import { getHealth } from '../controllers/health.controller';

const router = Router();

router.use('/health', healthRoutes);

// Also mount health at root for convenience
router.get('/health', getHealth);

export default router;