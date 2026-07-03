import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for test purposes
let users: Array<{ id: string; email: string; name: string }> = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  res.status(200).json({
    users: paginatedUsers,
    page,
    limit,
    total: users.length
  });
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, name, password' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = {
    id: String(nextId++),
    email,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;