import express from "express";

import usersRouter from "./routes/users";
import healthRouter from "./routes/health";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/health", healthRouter);
app.use("/users", usersRouter);

export { app };

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
