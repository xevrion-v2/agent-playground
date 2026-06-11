import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing purposes
const users: any[] = [];

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET /users/:id - Get a single user by id
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(200).json({ id: req.params.id });
  }
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = { id: String(users.length + 1), email, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;