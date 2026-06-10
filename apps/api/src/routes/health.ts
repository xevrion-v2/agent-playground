import { Router } from 'express';
import { checkServerHealth } from '../services/health';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    const healthStatus = await checkServerHealth();
    res.status(200).json({
      status: 'ok',
      data: {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(503).json({ status: 'error', data: { error: error.message } });
  }
});