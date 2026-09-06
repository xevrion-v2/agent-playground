import { Router } from "express";
import { z } from "zod";

const router = Router();

// Validation schema for POST /users
const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Validate request body
  const validation = createUserSchema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({
      status: "error",
      error: {
        code: 400,
        message: "Validation failed",
        details: validation.error.format()
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.data
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
