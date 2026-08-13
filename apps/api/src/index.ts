import express from "express";
import cors from "cors";

import usersRouter from "./routes/users";
import { inputSanitization } from "./middleware/sanitize";

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration from environment variables
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: corsOrigins,
  methods: (process.env.CORS_METHODS || "GET,POST,PUT,PATCH,DELETE,OPTIONS")
    .split(",")
    .map((m) => m.trim()),
  allowedHeaders: (
    process.env.CORS_ALLOWED_HEADERS || "Content-Type,Authorization"
  )
    .split(",")
    .map((h) => h.trim()),
  credentials: process.env.CORS_CREDENTIALS === "true",
  maxAge: parseInt(process.env.CORS_MAX_AGE || "86400", 10),
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(inputSanitization);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
