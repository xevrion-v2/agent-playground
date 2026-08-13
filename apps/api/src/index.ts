import express from "express";

import usersRouter from "./routes/users";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Only start listening when run directly (not imported for testing)
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
