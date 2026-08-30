import express from "express";

import { isCarriageReturnSymbolPresent } from '@xevrion/ui';
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
app.get('/utils/is-carriage-return-symbol-present', (req, res) => {
  const input = typeof req.query.input === 'string' ? req.query.input : '';
  const result = isCarriageReturnSymbolPresent(input);
  res.json({
    containsCarriageReturn: result,
  });
});


app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
