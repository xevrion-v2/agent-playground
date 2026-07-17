import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns the collection of users.
 *
 * Currently a stub: responds with an empty `data` array and a message noting
 * that real user listing is not implemented yet. The intended behavior is to
 * return the persisted set of users once a data layer exists.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user from the JSON request body.
 *
 * Currently a stub: echoes the request body back with a placeholder
 * `stub-user-id` and a "not implemented yet" message. The intended behavior is
 * to validate the payload, persist the user, and return the created record
 * with a server-generated id and a `201 Created` status.
 *
 * @param req - Express request carrying the new user fields in `req.body`.
 * @param res - Express response; returns `201` with the created user stub.
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
