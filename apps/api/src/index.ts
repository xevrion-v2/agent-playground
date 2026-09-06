import express from "express";

import usersRouter from "./routes/users";

const app = express();

function getPort(rawPort: string | undefined): number {
  if (rawPort === undefined) {
    return 4000;
  }

  if (!/^[0-9]+$/.test(rawPort)) {
    console.error(
      `Invalid PORT value "${rawPort}". PORT must be an integer between 1 and 65535.`
    );
    process.exit(1);
  }

  const port = Number(rawPort);
  if (port < 1 || port > 65535) {
    console.error(
      `Invalid PORT value "${rawPort}". PORT must be an integer between 1 and 65535.`
    );
    process.exit(1);
  }

  return port;
}

const port = getPort(process.env.PORT);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
