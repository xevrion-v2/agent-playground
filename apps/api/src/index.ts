import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Handle JSON parse errors with a JSON 400 response instead of HTML
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid JSON in request body.",
    });
  }
  next(err);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
