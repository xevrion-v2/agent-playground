import { Router } from 'express';
import { APIError, sendErrorResponse } from '../utils/apiError';

const router = Router();

// Example route using the error helper
router.get('/example', async (req, res) => {
  try {
    // Some async operation that might fail
    throw new Error('Example error');
  } catch (error) {
    const apiError = new APIError('Failed to fetch example data', 500);
    return sendErrorResponse(res, apiError);
  }
});

// Another example showing validation error
router.post('/example', (req, res) => {
  try {
    throw new Error('Validation failed');
  } catch (error) {
    const validationError = new APIError('Invalid input data', 400);
    return sendErrorResponse(res, validationError);
  }
});

export default router;