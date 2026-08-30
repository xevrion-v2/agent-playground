import express from "express";

import { isCarriageReturnSymbolPresent } from './utils/string';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);


app.get('/api/string/has-cr', (req, res) => {
  const input = String(req.query.value ?? '');
  res.json({ hasCarriageReturn: isCarriageReturnSymbolPresent(input) });
});
app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
