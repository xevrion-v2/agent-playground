import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Conservative JSON body size limit: 100kb
// Rationale: user payloads in this API are small (name, email, task fields).
// A 100kb ceiling prevents accidental or malicious oversized request bodies
// from exhausting memory while still accommodating any realistic use case.
const BODY_SIZE_LIMIT = "100kb";

app.use(express.json({ limit: BODY_SIZE_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
