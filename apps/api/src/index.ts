import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
const app = express();

app.use(cors());
// JSON body size limit: 100 KB (conservative limit to prevent abuse)
app.use(express.json({ limit: '100kb' }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
