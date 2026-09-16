import { Router } from "express";
import { z } from "zod";

const router = Router();

const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1).max(100).optional(),
  // Explicitly reject extra fields
}).strict();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  // Validate request body is an object
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Invalid request body: must be a JSON object",
    });
  }

  // Validate against schema
  const parseResult = createUserSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { email, name } = parseResult.data;
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedName = name?.trim() || undefined;

  // Generate server-side ID (in real app, use UUID or database ID)
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  res.status(201).json({
    data: {
      id: userId,
      email: normalizedEmail,
      name: normalizedName,
      createdAt: new Date().toISOString(),
    },
    message: "User created successfully",
  });
});

export default router;
