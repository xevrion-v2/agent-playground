import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';

const router = Router();

router.get('/', getHealth);

export default router;