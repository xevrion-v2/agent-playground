import { Router } from 'express';

const router = Router();

interface HealthResponse {
  status: string;
  data: {
    uptime: number;
    message: string;
    timestamp: string;
  };
}

router.get('/', async (req, res) => {
  const healthResponse: HealthResponse = {
    status: 'success',
    data: {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date().toISOString()