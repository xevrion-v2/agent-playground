import express from 'express';
import { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
const app = express();

app.use(helmet());
app.use(json({ limit: '100kb' }));
app.use(cors());

// Health check
