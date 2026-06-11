import { Router, Request, Response } from 'express';

const router = Router();

// In-memory storage for demo purposes
let users: Array<{ id: string; email: string; name: string }> = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(users);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  // Validation
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Email, name, and password are required' });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: String(nextId++),
    email,
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

export default router;