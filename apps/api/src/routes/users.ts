import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

// Get user by ID
router.get(
  '/:id',
  param('id').isUUID(),
  validate,
  (req, res) => {
    res.json({ message: 'Get user by ID' });
  }
);

// Create user
router.post(
  '/',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate,
  (req, res) => {
    res.json({ message: 'Create user' });
  }
);

// Update user
router.put(
  '/:id',
  param('id').isUUID(),
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email required'),
  validate,
  (req, res) => {
    res.json({ message: 'Update user' });
  }
);

// Delete user
router.delete(
  '/:id',
  param('id').isUUID(),
  validate,
  (req, res) => {
    res.json({ message: 'Delete user' });
  }
);

export default router;
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

export default router;
