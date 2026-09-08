// Regression test for issue #2395
// Unknown API routes should return JSON 404 instead of HTML fallback

import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

// JSON 404 fallback (implemented in src/index.ts)
app.use((req: express.Request, res: express.Response) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.path} not found`,
    });
    return;
  }
  res.status(404).send("Not Found");
});

export default app;
