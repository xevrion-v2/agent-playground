import express from "express";

import usersRouter from "./routes/users";
import { errorHandler } from "./utils/apiError";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Error-handling middleware (must be registered after routes)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
