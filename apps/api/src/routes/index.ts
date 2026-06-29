import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Health check endpoint
router.use('/health', healthRoutes);

export default router;