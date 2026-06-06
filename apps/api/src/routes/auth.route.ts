import { Router } from 'express';
import { sendApiError } from '../utils/error.helper';

const router = Router();

// Example of using the error helper in a route
router.post('/test-error', (req, res) => {
  return sendApiError(res, 'Test error implementation', 'TEST_ERROR');
});

// Example showing how to use the helper in an existing route
router.get('/login', (req, res) => {
  return sendApiError(res, 'Login endpoint test', 'LOGIN_ERROR');
});

export default router;