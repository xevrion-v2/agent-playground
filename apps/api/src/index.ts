import express, { Request, Response } from 'express';
import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


// Middleware
app.use(cors());
app.use(json({ limit: '100kb' }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  console.log(`TaskFlow API listening on port ${port}`);
});
