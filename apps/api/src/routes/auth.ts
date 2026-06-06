import { Router } from 'express';
import { sendApiError } from '../utils/errorHandler';

const router = Router();

router.post('/login', (req, res) => {
  try {
    // Simulate login logic
    // ...
  } catch (error) {
    return sendApiError(
      res,
      'Invalid credentials',
      401,
      'INVALID_CREDENTIALS'
    );
  }
  
});