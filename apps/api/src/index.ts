import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server = app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
});

function shutdown(signal: string) {
    console.log(`${signal} received, shutting down TaskFlow API.`);

  server.close(() => {
        console.log("TaskFlow API shut down cleanly.");
        process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
