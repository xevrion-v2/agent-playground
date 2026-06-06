import { Router } from 'express';
import { Request, Response } from 'express';

const healthRouter = Router();

// Health check endpoint
healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString(),
    },
  });
});

// Readiness check endpoint  
healthRouter.get('/ready', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Ready',
      timestamp: new Date().toISOString(),
    },
  });
});

export default healthRouter;