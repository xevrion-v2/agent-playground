import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing
const users: any[] = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  const { page = '1', limit = '10' } = req.query;
  
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.status(200).json(paginatedUsers);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Email, name, and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: String(nextId++),
    email,
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /users/:id - Get a single user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

export default router;