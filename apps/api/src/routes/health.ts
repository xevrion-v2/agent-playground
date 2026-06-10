import { Router, Request, Response } from 'express';

const router = Router();

interface HealthResponse {
  status: string;
  data: {
    uptime: number;
    message: string;
    timestamp: number;
  };
}

router.get('/', (req: Request, res: Response) => {
  const healthResponse: HealthResponse = {
    status: 'success',
    data: {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
  };
  res.status(200).json(healthResponse);
});

export default router;
export { type HealthResponse };