import express from "express";
import usersRouter from "./routes/users";
import { errorHandler } from "./middleware";

const app = express();
const port = process.env.PORT || 4000;

// Limit JSON body size to 16 KB (Issue #9)
app.use(express.json({ limit: "16kb" }));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", data: { service: "taskflow-api", uptime: process.uptime() } });
});

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
