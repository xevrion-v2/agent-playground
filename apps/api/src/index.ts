import express from "express";

import usersRouter from "./routes/users";
import { inputSanitization } from "./middleware/sanitize";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(inputSanitization);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
