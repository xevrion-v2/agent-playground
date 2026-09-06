import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";
import leaderboardRouter from "./routes/leaderboard";

const app = express();
const port = process.env.PORT || 4000;

// Parse body size limit from environment variable, default to 100kb
const BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT || "100kb";

app.use(express.json({ limit: BODY_SIZE_LIMIT }));

// Handle payload too large errors (413)
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err && (err as any).status === 413) {
    return res.status(413).json({
      error: "Payload Too Large",
      message: `Request body exceeds the maximum allowed size of ${BODY_SIZE_LIMIT}.`,
    });
  }
  // Handle entity too large from express.json
  if ((err as any).type === "entity.too.large") {
    return res.status(413).json({
      error: "Payload Too Large",
      message: `Request body exceeds the maximum allowed size of ${BODY_SIZE_LIMIT}.`,
    });
  }
  next(err);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
