import { Router, Request, Response } from 'express';

const router = Router();

interface HealthCheckResponse {
  status: string;
  data: {
    uptime: number;
    timestamp: string;
    service: string;
  };
}

router.get('/health', (req: Request, res: Response<HealthCheckResponse>) => {
  const healthResponse: HealthCheckResponse = {
    status: 'ok',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'taskflow-api'
    }
  };
  res.status(200).json(healthResponse);