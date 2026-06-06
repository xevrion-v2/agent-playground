import { sendApiError } from '../utils/errorHelper';
import { register, login, refresh } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validation.middleware';
import { authRouter } from '../middleware/auth.middleware';
import { Request, Response, NextFunction } from 'express';

authRouter.post('/register', validateRegister, register);

authRouter.post('/login', validateLogin, (req: Request, res: Response, next: NextFunction) => {
  try {
    // Pass to original login controller
    // This is where we'd integrate the error helper
  } catch (error: any) {
    sendApiError(res, error.message || 'Login failed', 'LOGIN_ERROR', 400);
  }
});