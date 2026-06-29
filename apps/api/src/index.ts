import express, { Request, Response } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// JSON 404 fallback for unknown API routes
app.use((req: Request, res: Response) => {
  if (req.path.startsWith("/api") || req.accepts("json") === "json") {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.path} not found`,
    });
    return;
  }
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
