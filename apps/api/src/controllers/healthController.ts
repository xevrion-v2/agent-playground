import { Request, Response } from 'express';

const healthCheck = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Health check successful',
      timestamp: new Date().toISOString()
    }
  });
};

const readyCheck = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Ready check successful',
      timestamp: new Date().toISOString()
    }
  });
};

export default {
  healthCheck,
  readyCheck
};