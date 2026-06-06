import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for demo purposes
let users: Array<{ id: number; email: string; name: string; password: string }> = [];
let nextId = 1;

/**
 * GET /users - List all users
 */
router.get('/', (_req: Request, res: Response) => {
  // Return users without password
  const safeUsers = users.map(({ password, ...user }) => user);
  res.status(200).json(safeUsers);
});

/**
 * POST /users - Create a new user
 */
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, name, password' });
  }

  const newUser = {
    id: nextId++,
    email,
    name,
    password,
  };

  users.push(newUser);

  // Return user without password
  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

export default router;
