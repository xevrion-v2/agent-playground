import { Router } from 'express';
import { validateBody, validateQuery, validateParams } from '../middleware/validate';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  userQuerySchema,
} from '../validation/user.schema';

const router = Router();

// GET /users - List users with query validation
router.get('/', validateQuery(userQuerySchema), (req, res) => {
  res.json({ success: true, data: [] });
});

// POST /users - Create user with body validation
router.post('/', validateBody(createUserSchema), (req, res) => {
  res.status(201).json({ success: true, data: req.body });
});

// GET /users/:id - Get user by ID with param validation
router.get('/:id', validateParams(userIdParamSchema), (req, res) => {
  res.json({ success: true, data: { id: req.params.id } });
});

// PATCH /users/:id - Update user with param and body validation
router.patch('/:id', validateParams(userIdParamSchema), validateBody(updateUserSchema), (req, res) => {
  res.json({ success: true, data: { id: req.params.id, ...req.body } });
});