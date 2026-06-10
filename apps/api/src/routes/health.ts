import { Router } from 'express';

const healthRouter = Router();

// Health check endpoint
healthRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  });
});

export default healthRouter;

// Alternative simple health check
export const healthCheck = (req: any, res: any) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Server is healthy'
    }
  });
};