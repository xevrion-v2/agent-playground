import { Request, Response } from 'express';

interface HealthResponse {
  status: string;
  data: {
    uptime: number;
    timestamp: string;
    service: string;
  };
}

export const healthCheck = (req: Request, res: Response) => {
  const health: HealthResponse = {
    status: 'ok',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toJSON(),
      service: 'taskflow-api'
    }
  };
  res.status(200).json(health);
};