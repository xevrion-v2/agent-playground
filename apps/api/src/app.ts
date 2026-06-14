import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());

app.use('/api', healthRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;