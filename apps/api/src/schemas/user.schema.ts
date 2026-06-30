import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
    role: z.enum(['CLIENT', 'FREELANCER', 'ADMIN']).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less').optional(),
    bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
    avatarUrl: z.string().url('Invalid URL').optional(),
    skills: z.array(z.string()).optional(),
    hourlyRate: z.number().min(0, 'Hourly rate must be non-negative').optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});