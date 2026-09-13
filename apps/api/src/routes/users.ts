/**
 * User service module providing CRUD operations for user management.
 * @module routes/users
 */

import { Router } from 'express';

const router = Router();

/**
 * In-memory storage for users.
 * @type {Array<{id: number, name: string, email: string}>}
 */
const users: any[] = [];

/**
 * Get all users.
 * @route GET /api/users
 * @returns {Array<Object>} List of all users
 */
router.get('/', (_req, res) => {
  res.json(users);
});

/**
 * Get a single user by ID.
 * @route GET /api/users/:id
 * @param {string} id - The user ID
 * @returns {Object} The user object
 * @returns {404} User not found
 */
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

/**
 * Create a new user.
 * @route POST /api/users
 * @param {string} name - The user's name
 * @param {string} email - The user's email
 * @returns {201} The created user object
 */
router.post('/', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

/**
 * Update an existing user.
 * @route PUT /api/users/:id
 * @param {string} id - The user ID to update
 * @param {Object} body - Updated user data
 * @returns {Object} The updated user
 * @returns {404} User not found
 */
router.put('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

/**
 * Delete a user by ID.
 * @route DELETE /api/users/:id
 * @param {string} id - The user ID to delete
 * @returns {204} No content on success
 * @returns {404} User not found
 */
router.delete('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

export default router;
