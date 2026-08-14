import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// 设置 JSON 请求体大小限制为 100kb，防止恶意大请求耗尽服务器内存
// 对于大多数 REST API 场景，100kb 已经足够覆盖正常的请求数据
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
