import express from "express";

import usersRouter from "./routes/users";

const app = express();
const jsonBodyLimit = "100kb";
const port = process.env.PORT || 4000;

app.use(express.json({ limit: jsonBodyLimit }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
