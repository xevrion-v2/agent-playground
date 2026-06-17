import { Router } from "express";
import { z } from "zod";

const router = Router();

const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").optional(),
});

router.get("/", (_req, res) => {
  res.json({ data: [], message: "User listing is not implemented yet." });
});

router.post("/", (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    });
    return;
  }
  res.status(201).json({
    data: { id: "stub-user-id", ...result.data },
    message: "User creation is not implemented yet.",
  });
});

export default router;
