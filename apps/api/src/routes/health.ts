import { Router } from 'express';
import { Request, Response } from 'express';

const healthRouter = Router();

// Liveness probe endpoint
healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Healthy',
      timestamp: new Date().toISOString()
    }
  });
});

// Readiness probe endpoint
healthRouter.get('/ready', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Ready',
      timestamp: new Date().toISOString()
    }
  });
});

export default healthRouter;