import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Only start the server when this file is executed directly,
// not when imported as a module (e.g. in tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export default app;
