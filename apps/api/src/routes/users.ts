import { Router, Request, Response } from "express";
import { getAllUsers, createUser, getUserById, deleteUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a list of all registered users.
 *
 * @returns {200} { data: User[], message: string }
 *
 * @example
 * ```bash
 * curl http://localhost:4000/users
 * ```
 */
router.get("/", (_req: Request, res: Response) => {
  const users = getAllUsers();
  res.json({
    data: users,
    message: users.length > 0 ? "Users retrieved successfully." : "No users found.",
  });
});

/**
 * GET /users/:id
 *
 * Retrieves a single user by their unique identifier.
 *
 * @param {string} id.path - The user UUID.
 * @returns {200} { data: User, message: string } - If the user is found.
 * @returns {404} { error: string } - If the user is not found.
 *
 * @example
 * ```bash
 * curl http://localhost:4000/users/some-uuid
 * ```
 */
router.get("/:id", (req: Request, res: Response) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ error: `User with id '${req.params.id}' not found.` });
    return;
  }
  res.json({ data: user, message: "User found." });
});

/**
 * POST /users
 *
 * Creates a new user with the provided name and email.
 * A UUID v4 is automatically generated for the new user.
 *
 * @param {string} name.body - The display name of the user.
 * @param {string} email.body - The email address of the user.
 * @returns {201} { data: User, message: string }
 *
 * @example
 * ```bash
 * curl -X POST http://localhost:4000/users \
 *   -H "Content-Type: application/json" \
 *   -d '{"name": "Alice", "email": "alice@example.com"}'
 * ```
 */
router.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = createUser({ name, email });
  res.status(201).json({
    data: user,
    message: "User created successfully.",
  });
});

/**
 * DELETE /users/:id
 *
 * Removes a user by their unique identifier.
 *
 * @param {string} id.path - The user UUID.
 * @returns {200} { message: string } - If the user was removed.
 * @returns {404} { error: string } - If the user was not found.
 *
 * @example
 * ```bash
 * curl -X DELETE http://localhost:4000/users/some-uuid
 * ```
 */
router.delete("/:id", (req: Request, res: Response) => {
  const removed = deleteUser(req.params.id);
  if (!removed) {
    res.status(404).json({ error: `User with id '${req.params.id}' not found.` });
    return;
  }
  res.json({ message: "User removed successfully." });
});

export default router;