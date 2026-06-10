import { Router } from 'express';
import { HealthService } from '../services/health';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    data: { 
      status: 'healthy',
      timestamp: new Date().toISOString()
    }
  });
});
