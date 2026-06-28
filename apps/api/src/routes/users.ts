import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users.
 * Currently returns an empty array as user listing is not yet implemented.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided request body.
 * Currently returns a stub user object as user creation is not yet implemented.
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
