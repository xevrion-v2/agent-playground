import { Router, Request, Response } from 'express';
import { ApiError, handleApiError } from '../utils/apiError';

const router = Router();

// Example route using the error helper
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    if (!taskId || taskId === 'undefined') {
      throw new ApiError(400, 'Invalid task ID');
    }

    // Task fetching logic would go here
    res.json({ id: taskId, message: 'Task endpoint placeholder' });
  } catch (error) {
    handleApiError(res, error);
  }
});