import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    users: []
  });
});

router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({
    user: {
      id: '1',
      name: 'New User',
      email: 'user@example.com',
      createdAt: new Date().toISOString()
    }
  });
});

export default router;