import { Router, Request, Response } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

router.get('/', healthCheck);
router.get('/health', healthCheck);

export default router;

// Health check route that returns normalized response
// This ensures we have a consistent health check response format
// across all our services

// The health check now returns a consistent envelope with status and data fields
// as required by the issue specification