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

// Set conservative JSON body size limit to prevent potential DoS attacks
// Issue: https://github.com/xebo/agent-playground/issues/1
app.use(express.json({ 
  limit: '10mb' // Conservative limit for JSON body size
}));

// Also handle URL encoded bodies with the same limit
app.use(express.urlencoded({ 
  extended: true,
  limit: '10mb' 
}));

// Additional middleware and routes would be configured here
});
