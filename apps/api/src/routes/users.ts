import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users.
 * Currently a stub — returns an empty array until the database layer is wired up.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user from the request body.
 * Currently a stub — echoes back the submitted fields with a placeholder id.
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
