import express from 'express';
import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


// Middleware
app.use(cors());
// JSON body size limit: 100kb to prevent large payload attacks
app.use(json({ limit: '100kb' }));

// Routes
app.use('/api', routes);
  console.log(`TaskFlow API listening on port ${port}`);
});
