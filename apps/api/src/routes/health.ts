import { Router, Request, Response } from 'express';

const healthRouter = Router();

/**
 * Health check endpoint
 * 
 * Normalized to use consistent envelope with status and data fields
 */
healthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    data: {
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
    }
  });
});

export { healthRouter };