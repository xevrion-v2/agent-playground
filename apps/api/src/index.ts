import express from "express";

import { isVerticalTabSymbolPresent } from '@repo/ui';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/utils/is-vertical-tab-symbol-present', (req, res) => {
  const input = typeof req.query.input === 'string' ? req.query.input : '';
  const result = isVerticalTabSymbolPresent(input);
  res.json({ result });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
