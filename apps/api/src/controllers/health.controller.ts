import { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: { healthy: true }
  });
};