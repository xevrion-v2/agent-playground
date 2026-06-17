import express from "express";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "100kb" }));
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});
app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log("TaskFlow API listening on port " + port);
});

function gracefulShutdown(signal: string) {
  console.log("Received " + signal + ". Starting graceful shutdown...");
  server.close(() => {
    console.log("All connections closed.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error("Forced shutdown after 10s timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
