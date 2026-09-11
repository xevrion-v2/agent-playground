import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

/**
 * User creation input schema with Zod
 */
const CreateUserSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format"),
  name: z.string().max(100, "Name must be 100 characters or less").trim().optional(),
});

/**
 * User query parameters schema
 */
const UserQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

/**
 * Type exports for TypeScript inference
 */
export { CreateUserSchema };
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UserQueryInput = z.infer<typeof UserQuerySchema>;

router.get("/", (req: Request, res: Response) => {
  const queryResult = UserQuerySchema.safeParse(req.query);
  if (!queryResult.success) {
    return res.status(400).json({
      error: "Invalid query parameters",
      details: queryResult.error.flatten().fieldErrors,
    });
  }

  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const validation = CreateUserSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: validation.error.flatten().fieldErrors,
    });
  }

  // TODO: Implement actual user creation with database
  // For now, return a stub response with server-generated ID
  res.status(201).json({
    data: {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      email: validation.data.email,
      name: validation.data.name,
      createdAt: new Date().toISOString(),
    },
    message: "User created successfully",
  });
});

export default router;