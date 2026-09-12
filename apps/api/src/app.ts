import express from 'express';
import taskRoutes from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';
const app = express();
// Routes
app.use('/api/tasks', taskRoutes);
// Error handling middleware (must be last)
app.use(errorHandler);

export default app;