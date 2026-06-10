import { Router, Request, Response } from 'express';
import { HealthCheckResponse } from '../types';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  const healthCheck = {
    status: 'ok',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };
  
  res.status(200).json({
    status: 'success',
    data: {
      health: healthCheck
    }
  });
});

router.get('/health', (req: Request, res: Response) => {
  const healthCheck = {
    status: 'ok',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };