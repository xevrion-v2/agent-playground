import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Lists all users in the system.
 *
 * Intended behavior (not yet implemented):
 * - Retrieve the full list of user records from the data store.
 * - Return the list inside the `data` array of the response payload.
 * - Support pagination, filtering, and sorting via query parameters.
 *
 * Current response returns an empty array as a placeholder until the
 * underlying data access layer is wired up.
 *
 * @param _req - Express request object (unused until pagination is added).
 * @param res  - Express response object used to send the JSON payload.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user account.
 *
 * Intended behavior (not yet implemented):
 * - Validate the incoming request body against the user schema.
 * - Persist the new user to the data store.
 * - Return the created user (including the generated id) with HTTP 201.
 *
 * Current response returns a stub id and echoes the request body until the
 * persistence and validation layers are wired up.
 *
 * @param req - Express request object; `req.body` holds the new user fields.
 * @param res - Express response object used to send the JSON payload.
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
