import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

/** Limit JSON request bodies to 100 KB to prevent memory exhaustion. */
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    data: {
      service: "taskflow-api",
      uptime: process.uptime()
    }
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
