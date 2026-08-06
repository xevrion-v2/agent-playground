import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  displayName: z.string().min(1).max(100).optional(),
}).strict(); // Reject extra fields

export type CreateUserInput = z.infer<typeof createUserSchema>;
