import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "success",
    data: {
      service: "taskflow-api",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
