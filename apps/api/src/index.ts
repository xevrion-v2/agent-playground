import express from "express";

import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";
import proposalsRouter from "./routes/proposals";
import paymentsRouter from "./routes/payments";
import reviewsRouter from "./routes/reviews";
import messagesRouter from "./routes/messages";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/proposals", proposalsRouter);
app.use("/payments", paymentsRouter);
app.use("/reviews", reviewsRouter);
app.use("/messages", messagesRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
