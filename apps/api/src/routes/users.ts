import { Router, Request, Response, NextFunction } from "express";
import { randomBytes } from "crypto";

const router = Router();

/** In-memory user store until the Prisma-backed service is wired in. */
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

let users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", createdAt: new Date().toISOString() },
  { id: "2", name: "Bob Smith", email: "bob@example.com", createdAt: new Date().toISOString() },
];

/**
 * GET /users — List all users.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ data: users });
});

/**
 * GET /users/:id — Get a single user by ID.
 */
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(404).json({ error: { message: "User not found", status: 404 } });
      return;
    }
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /users — Create a new user.
 * Expects JSON body with `name` and `email`.
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: { message: "Name is required and must be a non-empty string", status: 400 } });
      return;
    }
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      res.status(400).json({ error: { message: "Email is required and must be a non-empty string", status: 400 } });
      return;
    }

    // Check for duplicate email
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      res.status(409).json({ error: { message: "A user with this email already exists", status: 409 } });
      return;
    }

    const newUser: User = {
      id: randomBytes(8).toString("hex"),
      name: name.trim(),
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    res.status(201).json({ data: newUser });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /users/:id — Delete a user by ID.
 */
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const index = users.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: { message: "User not found", status: 404 } });
      return;
    }
    const removed = users.splice(index, 1)[0];
    res.json({ data: removed, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
