import express from "express";

import usersRouter from "./routes/users";
import jobsRouter from "./routes/jobs";
import healthRouter from "./routes/health";
import { errorHandler } from "./utils/apiError";
import { defaultPayloadLimit } from "./middleware/payloadLimit";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "10kb" }));

// Payload size limit middleware (10KB)
app.use(defaultPayloadLimit);

app.use("/health", healthRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

// Global error handler (must be last middleware)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});