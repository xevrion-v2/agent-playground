import { Router, Request, Response } from "express";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 *
 * Returns a list of all registered users.
 */
router.get("/", async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json({ data: users });
});

/**
 * POST /users
 *
 * Creates a new user with the provided email and optional name.
 */
router.post("/", async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json({ data: user });
});

/**
 * GET /users/:id
 *
 * Returns a single user by their UUID.
 */
router.get("/:id", async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ data: user });
});

/**
 * PATCH /users/:id
 *
 * Updates a user's email and/or name.
 */
router.patch("/:id", async (req: Request, res: Response) => {
  const user = await updateUser(req.params.id, req.body);
  res.json({ data: user });
});

/**
 * DELETE /users/:id
 *
 * Permanently removes a user from the database.
 */
router.delete("/:id", async (req: Request, res: Response) => {
  await deleteUser(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
