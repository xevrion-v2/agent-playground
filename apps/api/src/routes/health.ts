import { Router } from 'express';

const healthRouter = Router();

// Health check endpoint with normalized response shape
healthRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: {
      message: 'Service is healthy',
      timestamp: new Date().toISOString(),
    }
  });
});

healthRouter.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: { 
      message: 'Service is healthy',
      uptime: process.uptime()
    }
  });
});

export default healthRouter;