import { Router, Request, Response } from "express";
import {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService";

const router = Router();

/**
 * GET /users — Retrieve all users.
 */
router.get("/", (_req: Request, res: Response) => {
  const users = listUsers();
  res.json({ data: users });
});

/**
 * GET /users/:id — Retrieve a single user by ID.
 */
router.get("/:id", (req: Request, res: Response) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ data: user });
});

/**
 * POST /users — Create a new user.
 */
router.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }
  const user = createUser({ name, email });
  res.status(201).json({ data: user });
});

/**
 * PATCH /users/:id — Update user fields.
 */
router.patch("/:id", (req: Request, res: Response) => {
  const { name, email } = req.body;
  const updated = updateUser(req.params.id, { name, email });
  if (!updated) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ data: updated });
});

/**
 * DELETE /users/:id — Delete a user.
 */
router.delete("/:id", (req: Request, res: Response) => {
  const deleted = deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(204).send();
});

export default router;
