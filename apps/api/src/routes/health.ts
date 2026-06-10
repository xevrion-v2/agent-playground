import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

export default healthRouter;