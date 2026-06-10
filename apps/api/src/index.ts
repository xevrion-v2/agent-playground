import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors checks from './middleware/auth';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// JSON body size limit: 100KB to prevent large payload attacks
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use(checks);

// Routes

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
