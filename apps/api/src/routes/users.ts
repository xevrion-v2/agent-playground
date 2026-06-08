import { Router, Request, Response, NextFunction } from "express";
import { AppError } from "../middleware";

const router = Router();

// TODO: Add GET /users/:id route to fetch a single user by ID (Issue #10)
// TODO: Add PUT /users/:id route to update user profile fields (Issue #10)
// TODO: Add DELETE /users/:id route for admin user removal (Issue #10)

/**
 * List all users.
 * TODO: Add pagination support (query params: page, limit)
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 * Validates that email is provided and well-formed.
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name } = req.body;

    if (!email || typeof email !== "string") {
      throw new AppError(422, "A valid email field is required");
    }
    if (name !== undefined && typeof name !== "string") {
      throw new AppError(422, "Name must be a string if provided");
    }

    // Trim and validate email format
    const trimmed = email.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      throw new AppError(422, "Email must contain @ and a domain");
    }

    res.status(201).json({
      data: { id: "stub-user-id", email: trimmed, name: name || null },
      message: "User creation is not implemented yet."
    });
  } catch (err) {
    next(err);
  }
});

export default router;
