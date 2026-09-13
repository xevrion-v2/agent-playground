import { Router } from "express";
import { listUsers, createUser } from "../services/userService.js";

const router = Router();

/**
 * GET /users
 *
 * Returns the current list of all users.
 * Delegates to the user service layer for data retrieval.
 */
router.get("/", async (_req, res) => {
  const data = await listUsers();
  res.json({
    data,
    message: data.length > 0
      ? `Found ${data.length} user(s).`
      : "No users found.",
  });
});

/**
 * POST /users
 *
 * Creates a new user from the request body.
 * Delegates to the user service layer for creation.
 */
router.post("/", async (req, res) => {
  const data = await createUser(req.body);
  res.status(201).json({
    data,
    message: `User "${data.id}" created successfully.`,
  });
});

export default router;
