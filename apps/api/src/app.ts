import express from "express";
import cors from "cors";

import usersRouter from "./routes/users";
import piRouter from "./routes/pi";

const app = express();

// Add CORS middleware
app.use(cors());

// Configure JSON body size limit for security
app.use(express.json({ limit: "100kb" }));

// Health check endpoint with normalized response envelope
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      timestamp: new Date().toISOString()
    }
  });
});

app.use("/users", usersRouter);
app.use("/pi", piRouter);

export default app;
