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