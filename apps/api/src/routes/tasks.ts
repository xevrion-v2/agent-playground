import { Router, Request, Response } from "express";
import { sendError } from "../errorHandler";

const router = Router();

/**
 * GET /tasks
 * Return a list of tasks.
 *
 * TODO: Query database for user's tasks (filter by assignee, status, date range).
 * TODO: Implement pagination (cursor or offset-based).
 * TODO: Support sorting by created_at, due_date, priority.
 *
 * @route GET /tasks
 * @returns {Object} 200 - Task list
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", data: [] });
});

/**
 * GET /tasks/:id
 * Return a single task by ID.
 *
 * TODO: Validate that `id` is a valid UUID.
 * TODO: Return 404 when task doesn't exist.
 * TODO: Ensure the requesting user owns or is assigned to the task.
 *
 * @route GET /tasks/:id
 * @param  id - Task UUID
 * @returns {Object} 200 - Task object
 * @returns {Object} 404 - Task not found
 */
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: look up task in database; return 404 if missing
  sendError(res, 404, `Task ${id} not found.`);
});

/**
 * POST /tasks
 * Create a new task.
 *
 * TODO: Validate body fields: title (required, max 255 chars), description, assignee, due_date, priority (low|med|high).
 * TODO: Persist to database and return the created record.
 *
 * @route POST /tasks
 * @returns {Object} 201 - Created task stub
 */
router.post("/", (req: Request, res: Response) => {
  // TODO: validate body, persist to DB
  res.status(201).json({ status: "ok", data: { id: "stub-task-id", ...req.body } });
});

/**
 * PUT /tasks/:id
 * Update an existing task.
 *
 * TODO: Validate task ID exists; return 404 if missing.
 * TODO: Only allow partial updates (PATCH semantics) or full replacement.
 * TODO: Prevent modification of created_at or id fields.
 *
 * @route PUT /tasks/:id
 * @param  id - Task UUID
 * @returns {Object} 200 - Updated task stub
 * @returns {Object} 404 - Task not found
 */
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: look up task, update, persist
  res.json({ status: "ok", data: { id, ...req.body } });
});

/**
 * DELETE /tasks/:id
 * Remove a task.
 *
 * TODO: Validate task ID exists; return 404 if missing.
 * TODO: Soft-delete by default; hard-delete only with admin role.
 *
 * @route DELETE /tasks/:id
 * @param  id - Task UUID
 * @returns {Object} 200 - Deletion confirmation
 * @returns {Object} 404 - Task not found
 */
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: look up task, soft-delete
  res.json({ status: "ok", data: { deleted: id } });
});

export default router;
