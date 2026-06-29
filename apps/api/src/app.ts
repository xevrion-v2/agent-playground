import express from 'express';
import routes from './routes';
import healthRoutes from './routes/health.routes';

const app = express();


// Health check endpoint
app.use('/health', healthRoutes);

app.use('/api', routes);