import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import { errorResponse } from './utils/response';

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json(errorResponse(err.message));
});

export default app;