import { Request, Response } from 'express';

interface HealthResponse {
  status: string;
  data: {
    uptime: number;
    message: string;
    timestamp: string;
  };
}

export const getHealth = (req: Request, res: Response): void => {
  const health: HealthResponse = {
    status: 'success',
    data: {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date().toISOString()
    }
  };

  try {
    res.status(200).send(health);
  } catch (error) {
    res.status(500).json({ status: 'error', data: { message: 'Service unavailable' } });
  }
};