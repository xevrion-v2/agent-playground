import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const searchUsersSchema = z.object({
  query: z.object({
    q: z.string().min(1).max(100).optional(),
    skill: z.string().min(1).max(50).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const schemas: Record<string, z.ZodSchema> = {
  searchUsers: searchUsersSchema,
  updateUser: updateUserSchema,
  deleteUser: deleteUserSchema,
};

export function validate(schemaName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(500).json({ error: 'Unknown validation schema' });
    }

    const result = schema.safeParse({
      params: req.params,
      query: req.query,
      body: req.body,
    });

    if (!result.success) {
      return res.status(400).json({ error: 'Invalid request', details: result.error.format() });
    }

    next();
  };
}