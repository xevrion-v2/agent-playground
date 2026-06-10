import { Router } from 'express';

const healthRouter = Router();

// Standard health check with consistent envelope
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
    data: { message: 'Service is healthy' }
  });
});

export default healthRouter;