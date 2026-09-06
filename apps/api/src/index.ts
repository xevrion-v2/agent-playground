import express from "express";

import { errorHandler, notFoundHandler } from "./lib/errors";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// 404 兜底 —— 所有未匹配路由
app.use(notFoundHandler);

// 全局错误处理中间件 —— 统一捕获所有同步/异步错误
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
