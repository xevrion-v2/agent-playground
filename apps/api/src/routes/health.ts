import { Router } from 'express';
import { HealthService } from '../services/health';

const router = Router();

router.get('/health', (req, res) => {
  const healthData = {
    status: 'success',
    data: { 
      service: 'api',
      status: 'healthy',
      timestamp: new Date().toISOString()
    }
  };
  
  // Existing health check response
  res.status(200).json({ status: 'ok' });
  
  res.status(200).json(healthData);
});