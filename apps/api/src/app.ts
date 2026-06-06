import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

// Routes will be added here
app.use((err: any, req: any, res: any, next: any) => {
  errorHandler(err, req, res, next);
});

export default app;