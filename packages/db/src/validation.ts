import { z } from 'zod';
import { HttpException } from './exceptions';

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
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required for update',
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});

export const validateRequest = (validator: any, data: any) => {
  try {
    const result = validator.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.errors,
      };
    }
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      errors: [error],
    };
  }
};