import express from "express";
import cors from "cors";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Security: Limit request body size to prevent DoS
app.use(express.json({ limit: "10kb" }));

// Security: Configure CORS with environment-based whitelist
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

// Routes
app.use("/users", usersRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(`[ERROR] ${err.message}`, err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
