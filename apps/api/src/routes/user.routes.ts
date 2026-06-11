import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for demo purposes
let users: any[] = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: nextId++,
    email,
    name: name || null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// Reset helper for tests
export const resetUsers = () => {
  users = [];
  nextId = 1;
};

export { users };

export default router;