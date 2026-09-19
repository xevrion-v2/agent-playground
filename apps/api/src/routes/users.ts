import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 *
 * Returns a list of all users.
 * Currently returns a stub response.
 */
router.get("/", async (_req, res) => {
  const result = await listUsers();
  res.json(result);
});

/**
 * POST /users
 *
 * Creates a new user with the request body.
 * Currently returns a stub response with a generated ID.
 */
router.post("/", async (req, res) => {
  const result = await createUser(req.body);
  res.status(201).json(result);
});

export default router;