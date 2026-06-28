import express from "express";
import { Request, Response } from "express";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Request body size limit (100kb default, configurable via env)
const bodyLimit = process.env.BODY_LIMIT || "100kb";
app.use(express.json({ limit: bodyLimit }));

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "success",
    data: { status: "ok", service: "taskflow-api" }
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});