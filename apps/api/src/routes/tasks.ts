/** Tasks router — stub endpoints for the TaskFlow jobs API. */
import { Router } from 'express';

const router = Router();

// TODO: Implement database integration for job CRUD
// TODO: Add authentication middleware
// TODO: Add request validation
// TODO: Add pagination support
// TODO: Add filtering by status

router.get('/', (_req, res) => {
  res.json({ data: [], message: 'Task listing not implemented yet.' });
});

router.post('/', (_req, res) => {
  res.status(201).json({ message: 'Task creation not implemented yet.' });
});

export default router;
