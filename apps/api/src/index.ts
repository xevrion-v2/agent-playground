import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
import express from 'express';

const app = express();

// Configure body parsing with conservative size limits
// Body size limit set to 10mb to prevent potential DoS attacks
// Issue: Add request body size limit #1
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));
});
