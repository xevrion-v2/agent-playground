import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing purposes
let users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' }
];

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET /users/:id - Get a single user by id
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;