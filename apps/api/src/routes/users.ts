import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

// Input validation schema
const createUserSchema = z.object({
  email: z.string().email("A valid email is required"),
  name: z.string().min(1, "Name is required").max(100).optional(),
  role: z.enum(["client", "freelancer"]).optional(),
}).strict("Unexpected fields are not allowed");

type CreateUserInput = z.infer<typeof createUserSchema>;

/**
 * GET /users
 *
 * Retrieves a list of all users.
 * Currently returns a stub response — implementation pending.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user with server-generated ID.
 * Validates email, normalizes optional fields, rejects unknown fields.
 */
router.post("/", (req: Request, res: Response) => {
  // Reject non-object bodies
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    res.status(400).json({
      error: "Invalid request body",
      message: "A JSON object is required"
    });
    return;
  }

  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path.join("."),
      message: issue.message
    }));
    res.status(400).json({
      error: "Validation failed",
      errors
    });
    return;
  }

  const data: CreateUserInput = result.data;

  // Normalize values
  const user = {
    id: crypto.randomUUID(),
    email: data.email.toLowerCase().trim(),
    name: data.name?.trim() || null,
    role: data.role || "client",
    createdAt: new Date().toISOString()
  };

  res.status(201).json({ data: user, message: "User created" });
});

export default router;
