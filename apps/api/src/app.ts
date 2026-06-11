import express from 'express';
import routes from './routes';
import healthRouter from './routes/health.routes';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/health', healthRouter);

export default app;