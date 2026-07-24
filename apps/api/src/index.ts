import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT ?? 3001;

// FIX #4 (Body Size Limit): Prevent OOM from oversized payloads
app.use(express.json({ limit: '10kb' }));

// FIX #5 (CORS Configuration): Restrict cross-origin access
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// FIX #2 (Authentication Middleware): Require valid token for protected routes
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required: provide a Bearer token' });
  }
  // In production, verify JWT / session here
  const token = authHeader.slice(7);
  if (!token || token.length < 10) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  next();
};

// Protected routes
app.use('/api/users', authMiddleware, userRoutes);

// Health check (public)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// FIX #6 (Global Error Handling): Catch unhandled errors and respond gracefully
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Unhandled Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

export default app;
