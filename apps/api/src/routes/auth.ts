import { apiError } from '../utils/apiError';
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/authSchemas';
    const { email, password, name } = req.body;
    
    // Validate request body
    try {
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        return apiError(res, 'Validation failed', 400);
      }
    } catch (error) {
      return apiError(res, 'Internal server error', 500);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
      return apiError(res, 'User already exists', 409);
    }

    try {
      const user = await registerUser(email, password, name);
    } catch (error) {
      return apiError(res, 'Failed to create user', 500);
    }

    if (user) {
      res.status(201).json({ message: 'User registered successfully' });