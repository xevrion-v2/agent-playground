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

// Configure body parsing with a conservative size limit
app.use(express.json({ 
  limit: '10mb' // Set conservative JSON body size limit to prevent potential DoS attacks
}));

// URL encoded bodies
app.use(express.urlencoded({ extended: true }));

// Export or start the application
export default app;
});
