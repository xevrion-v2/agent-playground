import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  userQuerySchema,
} from '../validation/user.validation';

const router = Router();

// GET /users - list users with query validation
router.get('/', validate(userQuerySchema, 'query'), (req, res) => {
  // TODO: implement controller logic
  res.json({ message: 'List users', query: req.query });
});

// POST /users - create user with body validation
router.post('/', validate(createUserSchema, 'body'), (req, res) => {
  // TODO: implement controller logic
  res.status(201).json({ message: 'User created', data: req.body });
});

// GET /users/:id - get user by ID with param validation
router.get('/:id', validate(userIdParamSchema, 'params'), (req, res) => {
  // TODO: implement controller logic
  res.json({ message: 'Get user', id: req.params.id });
});

export default router;