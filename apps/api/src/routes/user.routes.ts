import { Router, Request, Response } from 'express';

const router = Router();

let users: Array<{ id: string; name: string; email: string }> = [];
let nextId = 1;

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(users);
});

router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: String(nextId++),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

router.get('/:id', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'User not found' });
});

export default router;