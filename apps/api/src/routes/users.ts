import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
});

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional().transform((name) => name?.trim()),
  lastName: z.string().optional().transform((name) => name?.trim()),
});

router.post("/", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
      issues: result.error.issues,
    });
  }

  const { email, firstName, lastName } = result.data;
  const userId = uuidv4();

  res.status(201).json({
    data: {
      id: userId,
      email,
      firstName,
      lastName,
    },
    message: "User created successfully."
  });
});

export default router;