// TODO: GET /tasks - retrieve paginated tasks with filters (status, category, budget range, location); return 400 for invalid filters, 500 on DB error
import { Router } from 'express';
import {
  getTasks,
const router = Router();

// TODO: GET /tasks - list all tasks with pagination and filters
// TODO: Support sorting by createdAt, budget, deadline; default sort by newest
router.get('/', getTasks);

// TODO: POST /tasks - create a new task (requires auth)
// TODO: Validate required fields (title, description, budget, deadline); return 400 for missing/invalid fields
// TODO: Return 201 on success with created task; 500 on DB failure
router.post('/', authenticate, createTask);

// TODO: GET /tasks/:id - get a single task by ID
// TODO: Return 404 if task not found; 500 on unexpected errors
router.get('/:id', getTaskById);

// TODO: PUT /tasks/:id - update a task (requires auth, must be owner)
// TODO: Return 404 if task not found, 403 if not owner, 400 for invalid update payload, 500 on DB failure
router.put('/:id', authenticate, updateTask);

// TODO: DELETE /tasks/:id - delete a task (requires auth, must be owner)
// TODO: Return 404 if task not found, 403 if not owner, 500 on DB failure
// TODO: Consider soft delete vs hard delete implications

// TODO: POST /tasks/:id/proposals - submit a proposal for a task (requires auth, must be freelancer)
// TODO: Return 409 if already proposed, 404 if task not found or closed, 400 for invalid proposal data, 500 on DB failure

export default router;