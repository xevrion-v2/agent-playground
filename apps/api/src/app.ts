import express from 'express';
import cors from 'cors';
import routes from './routes';
import { getHealth } from './controllers/health.controller';

const app = express();

app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', getHealth);

// API routes
app.use('/api', routes);