import { Router } from "express";
import { randomUUID } from "crypto";
import { z } from "zod";
import { apiError } from "../lib/apiError.js";

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
    apiError(res, 400, "Request body must be a JSON object.");
    return;
  }

  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    apiError(res, 400, "Validation failed.", result.error.flatten().fieldErrors as Record<string, unknown>);
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
