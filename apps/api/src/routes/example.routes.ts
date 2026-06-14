import { Router } from 'express';
import { apiError } from '../utils/apiError';

const router = Router();

router.get('/test-error', (req, res) => {
  try {
    throw new Error('This is a test error');
  } catch (error) {
    return apiError(res, 500, 'Test error occurred');
  }
});

router.get('/bad-request', (req, res) => {
  return apiError(res, 400, 'Bad request example');
});

export default router;
