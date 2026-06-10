import { Router } from 'express';
import { getHealthStatus } from '../services/healthService';

const router = Router();

// Health check endpoint that returns normalized response shape
router.get('/health', async (req, res) => {
  try {
    const healthStatus = await getHealthStatus();
    
    // Normalize the response to use consistent envelope with status and data fields
    return res.status(200).json({
      status: 'success',
      data: healthStatus,
      message: 'Health check completed successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      data: null,
      message: 'Health check failed'
    });
  }
});

export default router;