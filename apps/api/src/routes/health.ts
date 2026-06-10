import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const healthCheck = {
      status: 'ok',
      data: {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      }
    };

    return res.status(200).json({
      status: healthCheck.status,
      data: healthCheck.data
    });
  })
);