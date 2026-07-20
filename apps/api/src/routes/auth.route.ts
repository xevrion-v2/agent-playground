import { Router, Request, Response } from 'express';
import { createApiError } from '../utils/apiErrorHelper';

const router = Router();

// Simple example route that uses our error helper
router.post('/example-error', (req: Request, res: Response) => {
  try {
    // Example of using the error helper
    if (!req.body.email) {
      return createApiError(res, 400, 'Email is required');
    }
    
    // This is just an example - would normally have more logic here
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    return createApiError(res, 500, 'Internal server error');
  }
});

router.get('/health', (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    return createApiError(res, 500, 'Health check failed');
  }
});

router.post('/test-error', (req: Request, res: Response) => {
  try {
    // Example of a route that demonstrates the error helper
    const { throwError } = req.body;
    
    if (throwError) {
      throw new Error('Simulated error');
    }
    
    res.json({ success: true });
  } catch (error) {
    // Using our new helper function
    return createApiError(res, 500, error.message);
  }
});

export default router;