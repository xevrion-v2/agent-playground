import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing purposes
let users: Array<{ id: number; email: string; name: string; password: string }> = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  const { role } = req.query;
  
  let result = users;
  if (role) {
    // Filter by role if provided (stub implementation)
    result = users.filter(u => u.email.includes(role as string));
  }
  
  res.status(200).json(result);
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, name, password' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const newUser = { id: nextId++, email, name, password };
  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// GET /users/:id - Get a single user by id
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
});

export default router;