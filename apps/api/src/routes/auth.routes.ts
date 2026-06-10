import { Router, Request, Response } from 'express';
import { sendApiError, ApiError } from '../utils/apiError';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError({
        statusCode: 400,
        message: 'Email and password are required',
      });
    }

    // Placeholder for actual registration logic
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    sendApiError(res, error as Error);
  }
});

export default router;