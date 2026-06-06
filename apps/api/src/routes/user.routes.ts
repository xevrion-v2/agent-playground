import { Router, Request, Response } from 'express';

const router = Router();

let users: Array<{ id: number; name: string; email?: string }> = [];
let nextId = 1;

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ users });
});

router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  const newUser = {
    id: nextId++,
    name: name || 'Unknown',
    email,
  };
  
  users.push(newUser);
  
  res.status(201).json(newUser);
});

export default router;
