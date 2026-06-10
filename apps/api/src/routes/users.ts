import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
    email: z.string().email('Invalid email format').optional()
  })
});

// Validation middleware
const validate = (schema: z.ZodObject<any>) => (req: any, res: any, next: any) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZdError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    next(error);
  }
};

export { router, validate, createUserSchema, updateUserSchema };

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
