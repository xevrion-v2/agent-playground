import { Router, Request, Response } from 'express';

const healthRouter = Router();

interface HealthResponse {
  status: string;
  data: {
    uptime: number;
    timestamp: string;
    service: string;
    version: string;
  };
}

healthRouter.get('/health', (req: Request, res: Response) => {
  const health: HealthResponse = {
    status: 'ok',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'taskflow-api',
      version: '1.0.0'
    }
  };
  
  res.status(200).json(health);
});

export default healthRouter;