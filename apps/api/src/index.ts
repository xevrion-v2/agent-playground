import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
// Middleware
app.use(helmet());
app.use(cors());
// JSON body size limit: 100kb to prevent large payload attacks
app.use(express.json({ limit: '100kb" }));

// Routes
app.use('/api/auth', authRoutes);
