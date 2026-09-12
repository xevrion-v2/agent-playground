import { Router } from "express";
import { randomUUID } from "crypto";
import { z } from "zod";

const router = Router();

const createUserSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  name: z.string().min(1).max(200).optional(),
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: "Validation failed.",
      details: result.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, name } = result.data;

  res.status(201).json({
    data: {
      id: randomUUID(),
      email: email.toLowerCase().trim(),
      ...(name !== undefined && { name: name.trim() }),
    },
    message: "User created successfully.",
  });
});

export default router;
