import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Routes
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;