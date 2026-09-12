import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, public errors: any[] = []) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRequest = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({
          error: 'Validation Error',
          details: errors,
          message: 'Invalid request body'
        });
      }
      next(error);
    }
  };
};

// Common user validation schemas
export const userSchemas = {
  createUser: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  }),

  updateUser: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional()
  }).partial()
};