import { Router } from "express";
import { z } from "zod";

const router = Router();

// --- Validation schemas ---

const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1).max(100).optional(),
});

const updateUserSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  name: z.string().min(1).max(100).optional(),
});

// --- Validation middleware ---

function validate(schema: z.ZodSchema) {
  return (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        status: "error",
        code: "VALIDATION_ERROR",
        message: "Invalid request body",
        details: result.error.flatten().fieldErrors,
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

// --- Routes ---

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validate(createUserSchema), (req, res) => {
  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
