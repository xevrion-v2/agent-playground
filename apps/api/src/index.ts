import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// TODO: Add rate limiting middleware
// TODO: Add request logging middleware
// TODO: Add CORS configuration
// TODO: Add request timeout middleware
// TODO: Add health check monitoring (uptime tracking)

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
