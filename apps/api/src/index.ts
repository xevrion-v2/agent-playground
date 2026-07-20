import express, { Request, Response } from "express";

import usersRouter from "./routes/users";
import { errorHandler, notFoundHandler } from "./middleware/errors";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Error handling middleware (must be after routes)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
