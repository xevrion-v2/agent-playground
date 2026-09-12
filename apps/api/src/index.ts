import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Conservative JSON body limit: 100kb is sufficient for the current
// task payloads and rejects oversized/abusive request bodies early.
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
