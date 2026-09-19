import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
const app = express();
const PORT = process.env.PORT || 3001;
// Configure conservative JSON body size limit (100kb)
app.use(json({ limit: '100kb' }));

app.use(cors());
app.use(express.json());

  console.log(`API server running on port ${PORT}`);
});
export default app;
