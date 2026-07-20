import express from 'express';
import userRoutes from './routes/users';

const app = express();

app.use(express.json());

// Register routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

export default app;