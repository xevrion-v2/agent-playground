import { Router, Request, Response } from 'express';

const router = Router();

// In-memory store for testing
let users: Array<{ id: string; name: string; email: string }> = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ users });
});

// POST /users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body || {};
  
  const newUser = {
    id: String(nextId++),
    name: name || '',
    email: email || '',
  };
  
  users.push(newUser);
  
  res.status(201).json(newUser);
});

// Reset function for testing
export const resetUsers = () => {
  users = [];
  nextId = 1;
};

export default router;