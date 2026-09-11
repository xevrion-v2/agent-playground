import { Router, Request, Response } from "express";
import { z } from "zod";
import { ApiErrors, asyncHandler, sendSuccess } from "../utils/apiError";
import { prisma } from "../utils/prisma";

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
 * User ID params schema
 */
const UserIdParamsSchema = z.object({
  id: z.string().cuid("Invalid user ID format"),
});

/**
 * User update input schema
 */
const UpdateUserSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email format").optional(),
  name: z.string().max(100, "Name must be 100 characters or less").trim().optional().nullable(),
});

/**
 * Type exports for TypeScript inference
 */
export { CreateUserSchema, UpdateUserSchema };
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type UserQueryInput = z.infer<typeof UserQuerySchema>;

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const queryResult = UserQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
      throw ApiErrors.validationFailed(queryResult.error.flatten().fieldErrors);
    }

    const { limit, offset } = queryResult.data;
    const users = await prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.user.count();

    return sendSuccess(res, users, "Users retrieved successfully", 200, {
      total,
      limit: queryResult.data.limit,
      offset: queryResult.data.offset,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = UserIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const user = await prisma.user.findUnique({
      where: { id: paramsResult.data.id },
    });

    if (!user) {
      throw ApiErrors.notFound("User not found");
    }

    return sendSuccess(res, user, "User retrieved successfully", 200);
  })
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validation = CreateUserSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validation.data.email },
    });

    if (existingUser) {
      throw ApiErrors.conflict("User with this email already exists");
    }

    const user = await prisma.user.create({
      data: {
        email: validation.data.email,
        name: validation.data.name,
      },
    });

    return sendSuccess(res, user, "User created successfully", 201);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = UserIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const validation = UpdateUserSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: paramsResult.data.id },
    });

    if (!existingUser) {
      throw ApiErrors.notFound("User not found");
    }

    // Check if email is being changed to an existing email
    if (validation.data.email && validation.data.email !== existingUser.email) {
      const emailConflict = await prisma.user.findUnique({
        where: { email: validation.data.email },
      });

      if (emailConflict) {
        throw ApiErrors.conflict("Email already in use by another user");
      }
    }

    const user = await prisma.user.update({
      where: { id: paramsResult.data.id },
      data: {
        email: validation.data.email,
        name: validation.data.name,
      },
    });

    return sendSuccess(res, user, "User updated successfully", 200);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = UserIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: paramsResult.data.id },
    });

    if (!existingUser) {
      throw ApiErrors.notFound("User not found");
    }

    await prisma.user.delete({
      where: { id: paramsResult.data.id },
    });

    return sendSuccess(res, { id: paramsResult.data.id }, "User deleted successfully", 200);
  })
);

export default router;