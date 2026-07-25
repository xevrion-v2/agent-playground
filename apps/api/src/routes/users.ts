import { Router } from "express";

/** Express router for user endpoints — stub implementations, not yet connected to a database. */
const router = Router();

/**
 * List all users. Stub — returns empty array.
 *
 * @returns JSON with `data` (empty array) and `message`
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user. Stub — returns the body with a fake ID.
 *
 * @param req - request body: `{ name: string, email: string }`
 * @returns JSON with `data` (created user) and `message`, status 201
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
