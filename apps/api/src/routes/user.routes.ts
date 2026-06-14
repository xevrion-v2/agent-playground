import { Router, Request, Response } from 'express';

const router = Router();

// In-memory storage for test purposes
let users: any[] = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = {
    id: nextId++,
    email,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;