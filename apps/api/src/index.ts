import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const bodySizeLimit = process.env.BODY_SIZE_LIMIT || "1mb";

// Configure JSON body parser with size limit
app.use(express.json({ limit: bodySizeLimit }));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      timestamp: new Date().toISOString(),
    },
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
