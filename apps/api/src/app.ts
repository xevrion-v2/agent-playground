// Apply the normalized health check response shape
// Updated health check to use consistent envelope with status and data fields
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import * as routes from './routes';
import { connectDb } from './config/db';
import { normalizeHealthCheckResponse } from './middleware/health';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(json());
app.use((req, res, next) => {
  if (req.path === '/health' || req.path === '/api/health') {
    next();
  } else {
    // Apply health check normalization
    next();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Health check route with normalized response envelope
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString()
    }
  });
});

import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'OK',
      timestamp: new Date().toISOString()
    }
  });
});

export default router;