import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { sendApiError, createApiError } from '../utils/apiError';
import { z } from 'zod';

const router = Router();
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// Example route demonstrating API error helper usage
router.get('/me', (req: Request, res: Response) => {
  if (!req.user) {
    const error = createApiError(401, 'Unauthorized: Please log in to access this resource');
    return sendApiError(res, error);
  }
  return res.json({ success: true, data: req.user });
});

export default router;