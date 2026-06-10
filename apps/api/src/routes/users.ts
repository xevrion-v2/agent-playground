import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult, check } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Validation middleware
const validateUserCreate = [
  body('name').notEmpty().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be between 1-100 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserUpdate = [
  body('name').optional().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1-100 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
];

// Validation error handler
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
  message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// GET /users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /users/:id
router.get(
  '/:id',
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          profile: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
);

// POST /users
router.post(
  '/',
  validateUserCreate,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Create user in database
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // In a real app, this would be hashed
        },
      });
      
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
);

// PATCH /users/:id
router.patch(
  '/:id',
  validateUserUpdate,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
);

// DELETE /users/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
export default router;
