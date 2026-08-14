import express from "express";

import usersRouter from "./routes/users";
import { sendOk } from "./helpers/response";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  sendOk(res, { service: "taskflow-api" }, "ok");
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
