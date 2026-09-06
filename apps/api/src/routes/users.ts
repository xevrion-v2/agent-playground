import { Router } from "express";
import { z } from "zod";

const router = Router();

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1).max(100).optional(),
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: parsed.data.email,
      name: parsed.data.name,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
