import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { ok: true }
  });
});

export default router;