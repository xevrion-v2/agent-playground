import { Router } from "express";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["client", "freelancer"]).optional(),
});

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
  // Validate request body
  const parsed = createUserSchema.safeParse(req.body);
  if (parsed.success) {
    req.body = parsed.data;
  } else {
    return badRequest(res, parsed.error.errors.map(e => e.message).join(", "));
  }
});

export default router;
