import { Router, Request, Response } from 'express';

const router = Router();

// In-memory storage for test purposes
let users: any[] = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET /users/:id - Get a single user by id
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;