import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /users – List all users.
 *
 * @route GET /users
 * @returns { data: User[], message: string }
 */
router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json({
    data: users,
    message: users.length === 0
      ? "User listing is not implemented yet."
      : `Found ${users.length} user(s).`,
  });
});

/**
 * POST /users – Create a new user.
 *
 * @route POST /users
 * @bodyparam {string}   email  - Required email address.
 * @bodyparam {string}   [name] - Optional display name.
 * @returns { data: User, message: string }
 */
router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet.",
  });
});

export default router;
