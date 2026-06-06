import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
// Middleware
app.use(helmet());
app.use(cors());

// JSON body parser with conservative size limit (100 KB)
app.use(express.json({ limit: '100kb' }));

app.use(rateLimiter);

// Health check
