import { Router } from 'express';

const router = Router();

/** GET /health — standardized health check response */
router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'taskflow-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
