import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

router.get('/health', healthCheck);
router.get('/', healthCheck);

export default router;

// Health check routes with normalized response shape
// Returns consistent envelope with status and data fields
// as specified in the GitHub issue