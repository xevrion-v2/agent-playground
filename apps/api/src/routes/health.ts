import { Router } from 'express';
import { sendErrorResponse, ApiError, handleApiError } from '../utils/apiError';

const router = Router();

router.get('/', (req, res) => {
  try {
    // Simulate a potential error condition
    throw new ApiError(503, 'Service temporarily unavailable');
  } catch (error) {
    handleApiError(error, res);
  }
});

export default router;