import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "100kb" })); // Configure conservative JSON body size limit (Closes #9)

app.get("/health", (_req, res) => {
  // Normalize health check response shape (Closes #8)
  res.json({ status: "ok", data: { service: "taskflow-api" } });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
