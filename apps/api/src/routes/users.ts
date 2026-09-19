import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users. Currently returns an empty stub
 * until full user listing is implemented.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user. Currently returns a stub with the request body
 * merged into a placeholder ID until full creation is implemented.
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
