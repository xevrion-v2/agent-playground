import { apiError, ApiErrorResponse } from '../utils/apiError';
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/authSchemas';
    // Validate request body
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return apiError(res, 'Validation failed', 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return apiError(res, 'User already exists', 409);
    }

    // Create user
    try {
      const user = await registerUser(email, name, password);
    } catch (error) {
      return apiError(res, 'Failed to create user', 500);
    }

    if (user) {
      res.status(201).json({ 
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }