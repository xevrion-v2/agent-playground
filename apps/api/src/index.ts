import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
  credentials: true,
}));

// Request body size limit
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/users", usersRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
  });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
