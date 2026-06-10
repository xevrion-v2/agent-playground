import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Lists all users. Currently a stub that responds with an empty collection
 * until persistence is wired up.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a user from the request body. Currently a stub that echoes the
 * payload back with a placeholder id and a 201 status.
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
