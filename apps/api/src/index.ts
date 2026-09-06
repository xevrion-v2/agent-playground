import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Error handler for payload too large
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      error: "Payload too large",
      message: "Request body must not exceed 1mb"
    });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
