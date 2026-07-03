import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
app.use(helmet());
app.use(cors());
// Conservative JSON body size limit to prevent large payload attacks
app.use(json({ limit: '100kb' }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
