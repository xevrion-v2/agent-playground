import { Router } from "express";
import { createUserSchema } from "../validators";
import { randomUUID } from "crypto";

const router = Router();

const users: Array<{ id: string; username: string; email: string; displayName?: string; createdAt: Date }> = [];

/**
 * GET /users - List all users
 */
router.get("/", (_req, res) => {
  res.json({
    data: users,
    message: "User listing"
  });
});

/**
 * POST /users - Create a new user
 * 
 * Validates payload with Zod schema:
 * - username: 3-50 chars, alphanumeric + underscore
 * - email: valid email format
 * - password: 8-128 chars
 * - displayName: optional, 1-100 chars
 * 
 * Extra fields in request body are rejected.
 * Server generates UUID as user id.
 */
router.post("/", (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      details: result.error.flatten().fieldErrors
    });
    return;
  }

  const user = {
    id: randomUUID(),
    username: result.data.username,
    email: result.data.email,
    displayName: result.data.displayName,
    createdAt: new Date()
  };
  
  users.push(user);

  res.status(201).json({ data: user, message: "User created" });
});

export default router;
