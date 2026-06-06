import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@taskflow/db';
import { ApiError, sendApiError } from '../utils/apiError';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendApiError(res, new ApiError({
      statusCode: 400,
      message: 'Invalid input',
      errors: parsed.error.flatten().fieldErrors,
    }));
  }

  const { email, password, name } = parsed.data;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return sendApiError(res, new ApiError({
      statusCode: 409,
      message: 'User already exists',
    }));
  }

  // Create user logic would go here
router.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendApiError(res, new ApiError({
      statusCode: 400,
      message: 'Invalid input',
      errors: parsed.error.flatten().fieldErrors,
    }));
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return sendApiError(res, new ApiError({
      statusCode: 401,
      message: 'Invalid credentials',
    }));
  }

  // Verify password and generate token logic would go here