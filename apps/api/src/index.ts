import express from "express";

import { isNewlineSymbolPresent } from './utils/string';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/is-newline-symbol-present', (req, res) => {
  const str = String(req.query.str ?? '');
  res.json({ hasNewline: isNewlineSymbolPresent(str) });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
