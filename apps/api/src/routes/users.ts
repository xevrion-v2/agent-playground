import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

// --- Schemas ---

const userIdSchema = z.object({
  id: z.string().nonempty("User ID is required"),
});

const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
});

const updateUserSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  name: z.string().optional(),
});

// --- Middleware ---

function validateParams(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors.map((e) => e.message).join(", "),
      });
    }
    req.params = result.data;
    next();
  };
}

function validateBody(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors.map((e) => e.message).join(", "),
      });
    }
    req.body = result.data;
    next();
  };
}

// --- Routes ---

// GET /users — list all users (stub)
router.get("/", (_req: Request, res: Response) => {
  res.json([]);
});

// GET /users/:id — get user by ID
router.get(
  "/:id",
  validateParams(userIdSchema),
  (req: Request, res: Response) => {
    // Stub: return user info
    res.json({ id: req.params.id, name: "Test User", email: "test@example.com" });
  }
);

// POST /users — create a new user
router.post(
  "/",
  validateBody(createUserSchema),
  (req: Request, res: Response) => {
    // Stub: return created user
    res.status(201).json({
      id: "clx...",
      email: req.body.email,
      name: req.body.name || null,
    });
  }
);

// PUT /users/:id — update user
router.put(
  "/:id",
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  (req: Request, res: Response) => {
    // Stub: return updated user
    res.json({
      id: req.params.id,
      email: req.body.email || "test@example.com",
      name: req.body.name || "Updated User",
    });
  }
);

// DELETE /users/:id — delete user
router.delete(
  "/:id",
  validateParams(userIdSchema),
  (req: Request, res: Response) => {
    // Stub: return success
    res.json({ message: `User ${req.params.id} deleted` });
  }
);

export default router;
