import { Router } from 'express';
import { successResponse } from '../utils/response';

const router = Router();

router.get('/', (_req, res) => {
  res.json(successResponse({ healthy: true }));
});

export default router;
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
}

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    status: 'success',
    data,
  };
}

export function errorResponse(message: string): ApiResponse<{ message: string }> {
  return {
    status: 'error',
    data: { message },
  };
}