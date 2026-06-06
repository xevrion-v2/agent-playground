import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    data: { message: 'Service is healthy' }
  });
});

export default healthRouter;