import { Router } from 'express';

const router = Router();

// Stub data
const users = [
  { id: 'stub-user-id', name: 'stub-user', email: 'stub@email.com' }
];

// GET /users — list all users
router.get('/', (req, res) => {
  res.json({ data: users });
});

// GET /users/:id — get single user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ data: user });
});

// POST /users — create new user
// FIX #1 (Mass Assignment): Whitelist specific fields instead of spreading untrusted req.body
// FIX #3 (Input Validation): Validate input before processing
router.post('/', (req, res) => {
  const { name, email } = req.body;

  // Basic input validation
  if (!name || typeof name !== 'string' || name.length < 2) {
    return res.status(400).json({ error: 'Name must be a string with at least 2 characters' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  // Whitelist only allowed fields — prevent mass assignment / prototype pollution
  res.status(201).json({
    data: {
      id: 'stub-user-id',
      name,
      email
    }
  });
});

export default router;
