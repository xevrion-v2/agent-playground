import express from "express";
import usersRouter from "./routes/users";

const app = express();

// Configure a conservative JSON body size limit of 100kb
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export default app;
