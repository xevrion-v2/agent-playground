import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api", timestamp: new Date().toISOString() });
});

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
