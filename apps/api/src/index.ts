import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// [FIX #4] Limit request body size to prevent OOM denial-of-service
app.use(express.json({ limit: "10kb" }));

// [FIX #5] CORS: restrict to allowed origins only
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000").split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// [FIX #2] Simple token-based authentication middleware
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Skip auth for health check
  if (req.path === "/health") {
    next();
    return;
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || token !== process.env.API_TOKEN) {
    res.status(401).json({ error: "Unauthorized: valid Bearer token required" });
    return;
  }
  next();
}

app.use(authMiddleware);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// [FIX #6] Global error handling middleware — prevents unhandled errors from crashing the process
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
