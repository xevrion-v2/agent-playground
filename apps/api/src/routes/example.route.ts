import { Router } from 'express';
import { sendErrorResponse, createNotFoundError } from '../utils/apiError';

const router = Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id || id === 'undefined') {
    return sendErrorResponse(res, 400, 'Invalid ID provided');
  }

  const resource = null;
  if (!resource) {
    return sendErrorResponse(res, 404, `Resource with id ${id} not found`);
  }

  return res.json({ success: true, data: resource });
});

export default router;