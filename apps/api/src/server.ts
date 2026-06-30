import express from 'express';
import healthRouter from './routes/health';

const app = express();

// Health check route
app.use('/health', healthRouter);

// Placeholder for other routes and middleware

export default app;

// Alternative health check implementation
export const healthCheckHandler = (req: any, res: any) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Server is healthy',
      timestamp: new Date().toISOString()
    }
  });
};