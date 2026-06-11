import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing
let users: Array<{ id: number; email: string; name?: string }> = [];
let nextId = 1;

// List users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ users });
});

// Create user
router.post('/', (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const newUser = {
    id: nextId++,
    email,
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

export default router;