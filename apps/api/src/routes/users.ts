import { Router } from "express";

/**
 * User service routes (stub).
 *
 * Scaffolding for user management endpoints: every handler currently
 * returns placeholder data with a "not implemented yet" message.
 * Intended to be replaced with real persistence (see `packages/db`)
 * when user features land.
 */
const router = Router();

/**
 * GET /api/users — list users.
 *
 * Stub: responds 200 with an empty `data` array and a placeholder
 * message; no listing is actually performed yet.
 *
 * @param _req - Express request (currently unused).
 * @param res - Express response used to send the JSON payload.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /api/users — create a user.
 *
 * Stub: echoes the request body back inside `data` with a placeholder
 * id (`stub-user-id`) and responds 201; nothing is persisted yet, so
 * the created "user" only exists in the response.
 *
 * @param req - Express request whose JSON body is spread into `data`.
 * @param res - Express response used to send the JSON payload.
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
