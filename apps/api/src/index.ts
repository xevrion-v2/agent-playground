import express, { type Request, type Response, type NextFunction } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Limit JSON body size to 10 KB (sufficient for email+name; prevents large payload attacks)
app.use(express.json({ limit: "10kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Global error handler — returns JSON instead of HTML for body-parser errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body", status: "error" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large", status: "error" });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error", status: "error" });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
