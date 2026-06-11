import { Router } from 'express';
import healthRouter from './health.routes';

const router = Router();

router.use('/health', healthRouter);

export default router;