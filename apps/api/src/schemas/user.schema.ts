import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  role: z.enum(['CLIENT', 'FREELANCER', 'ADMIN']).optional(),
});

export const userUpdateSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less').optional(),
  role: z.enum(['CLIENT', 'FREELANCER', 'ADMIN']).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});