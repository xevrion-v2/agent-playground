import express from 'express';
import authRoutes from './routes/auth.routes';
// ... other imports

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Error handling example with our new helper
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err.message });
});