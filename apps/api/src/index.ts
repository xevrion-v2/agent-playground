import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

/** Catch-all 404 handler */
app.use((_req, res) => {
  res.status(404).json({ error: { message: "Not Found" } });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
