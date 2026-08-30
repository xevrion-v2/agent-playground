import express from "express";

import { isTabSymbolPresent } from '@repo/ui';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
app.get('/api/utils/is-tab-symbol-present', (req, res) => {
  const input = String(req.query.value ?? '');
  res.json({ result: isTabSymbolPresent(input) });
});

  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
