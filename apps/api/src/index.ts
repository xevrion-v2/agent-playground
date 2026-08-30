import express from "express";

import { isTabSymbolPresent } from '@agent-playground/ui';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/is-tab-symbol-present', (req, res) => {
  const input = typeof req.query.input === 'string' ? req.query.input : '';
  res.json({ result: isTabSymbolPresent(input) });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
