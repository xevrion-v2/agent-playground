import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Health check successful',
      timestamp: new Date().toISOString()
    }
  });
};