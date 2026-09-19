import { z } from 'zod';
import { ZodError } from 'zod';

// Request body validation schemas
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
    email: z.string().email('Invalid email format').optional()
  })
});

export const getUserParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format')
  })
});

interface ValidationError {
  success: boolean;
  error: string;
  details?: z.ZodError['errors'] | string;
}

export const validate = (schema: z.ZodObject<any>) => (req: any, res: any, next: any) => {
  try {
    schema.parse(req);
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: 'Validation failed', details: error instanceof ZodError ? error.errors : 'Validation error' });
  }
};