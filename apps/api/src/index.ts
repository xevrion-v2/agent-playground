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


// Middleware
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(cors());

// Routes
  res.json({ message: 'TaskFlow API' });
});

// Error handler for body size limit exceeded
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body too large' });
  }
  next(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
