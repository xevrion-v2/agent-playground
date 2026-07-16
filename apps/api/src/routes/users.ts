import { Router } from "express";
import { z } from "zod";

const router = Router();

const createUserSchema = z
  .object({
    email: z.string().trim().email().max(255),
    name: z.string().trim().min(1).max(100).optional()
  })
  .strict();

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
      details: parsed.error.flatten().fieldErrors
    });
  }

  const { email, name } = parsed.data;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name !== undefined ? { name } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
