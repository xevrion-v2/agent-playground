import { Router } from "express";
import { z } from "zod";

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
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
    data: {
      id: "stub-user-id",
      ...result.data,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
