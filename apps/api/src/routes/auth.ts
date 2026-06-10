import { Router } from 'express';
import { handleApiError, ApiError } from '../utils/apiError';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    // Existing registration logic would go here
    // For demonstration, throw an error to show usage
    throw new ApiError(400, 'Email is required');
  } catch (error) {
    handleApiError(error, res);
  }
});

export default router;