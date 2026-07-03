import { Router, Request, Response } from 'express';
import { ApiError, sendError } from '../utils/apiError';

const router = Router();

// GET /tasks - Fetch all tasks
router.get('/', async (_req: Request, res: Response) => {
  try {
    // Placeholder: In production, this would call a service layer
    const tasks: unknown[] = [];
    res.json({ tasks });
  } catch (error) {
    sendError(res, error);
  }
});

// GET /tasks/:id - Fetch a single task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      throw new ApiError(400, 'Invalid task ID');
    }
    // Placeholder: fetch task from service
    res.json({ task: { id, title: 'Sample task' } });
  } catch (error) {
    sendError(res, error);
  }
});

export default router;