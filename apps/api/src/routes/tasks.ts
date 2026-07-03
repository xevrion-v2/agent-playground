import { Router, Request, Response } from 'express';
import { ApiError } from '../utils/apiError';
const router = Router();
router.get('/:id', async (req: Request, res: Response) => {
  const task = await getTaskById(req.params.id);
  if (!task) {
    throw ApiError.notFound('Task not found');
  }
  return res.json(task);
});