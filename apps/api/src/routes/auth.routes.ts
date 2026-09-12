import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/auth.controller';
import { sendAPIError } from '../utils/error.helper';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await register(req, res);
    res.status(201).json(result);
  } catch (error) {
    sendAPIError(res, 'Registration failed', 500, error);
  }
});


router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await login(req, res);
    res.json(result);
  } catch (error) {
    sendAPIError(res, 'Login failed', 500, error);
  }
});