import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users (stub — not yet implemented).
 */
router.get("/", (_req: Request, res: Response) => {
  // TODO: Implement user listing with pagination
  // TODO: Add authentication middleware to protect this route
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user (stub — not yet implemented).
 * Validates that email is present and looks like a valid address.
 */
router.post("/", (req: Request, res: Response) => {
  const { email, name } = req.body ?? {};

  // Basic input validation
  if (!email || typeof email !== "string") {
    res.status(400).json({
      error: "Validation failed",
      message: "A valid email address is required."
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "Validation failed",
      message: "Email format is invalid."
    });
    return;
  }

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
    res.status(400).json({
      error: "Validation failed",
      message: "Name must be a non-empty string if provided."
    });
    return;
  }

  // TODO: Persist user to database via Prisma
  // TODO: Return the created user with its database ID
  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name: name?.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
