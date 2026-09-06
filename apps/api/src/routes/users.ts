import { Router } from "express";
import { z } from "zod";

const router = Router();

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, name } = parsed.data;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name ? { name } : {}),
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
