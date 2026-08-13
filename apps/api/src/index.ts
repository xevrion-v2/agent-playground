import express from "express";
import cors from "cors";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Disable weak ETag generation for dynamic JSON responses
app.set("etag", false);

// Enable CORS so the web frontend can reach the API
app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
