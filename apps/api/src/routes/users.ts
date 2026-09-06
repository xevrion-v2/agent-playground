import { Router } from "express";
import { z } from "zod";

const router = Router();

/** Validation schema for creating a user */
const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

/**
 * GET /users — list all users (stub)
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users — create a new user (stub with validation)
 */
router.post("/", (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...parsed.data,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
