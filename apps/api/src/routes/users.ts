import { Router, Request, Response } from 'express';
import { z } from 'zod';

const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
  }).partial({
    password: true // Make password optional for update operations
});

const router = Router();

// Validation middleware
const validateRequest = (req: Request, res: Response, next: Function) => {
  try {
    const result = userSchema.safeParse({
      body: req.body
    });
    
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.errors
      });
    }
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors
      });
    }
    next(error);
  }
};

export { router, validateRequest };
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

export default router;
