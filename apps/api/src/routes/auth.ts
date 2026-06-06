import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@taskflow/db';
import { ApiError, sendApiError } from '../utils/apiError';

const router = Router();

  try {
    const validatedData = registerSchema.parse(req.body);
  } catch (error) {
    const apiError = new ApiError({ statusCode: 400, message: 'Invalid input' });
    return sendApiError(res, apiError);
  }

  // TODO: Implement registration logic