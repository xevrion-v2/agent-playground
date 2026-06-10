import { Router } from "express";

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

import { z } from 'zod';
import { validateRequest } from '../middleware/validation';

// User validation schemas
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field is required for update',
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});

// Validation middleware for user routes
export const validateCreateUser = validateRequest(createUserSchema);
export const validateUpdateUser = validateRequest(updateUserSchema);
export const validateUserId = validateRequest(userIdSchema);
export default router;
