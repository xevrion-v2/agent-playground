import { Router, Request, Response } from 'express';
import { sendApiError } from '../utils/apiError';

const router = Router();

// Example route using the error helper
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validation logic would go here
    if (!email || !password) {
      return sendApiError(res, 400, 'Email and password are required');
    }
    
    // Actual login logic would go here
    // ...
  } catch (error) {
    sendApiError(res, 500, 'Internal server error', 'INTERNAL_ERROR');
  }
});

export default router;