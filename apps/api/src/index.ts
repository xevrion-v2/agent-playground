import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const serviceName = "taskflow-api";

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: serviceName,
    data: {
      service: serviceName
    }
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
