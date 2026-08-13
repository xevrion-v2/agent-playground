import express from "express";

import usersRouter from "./routes/users";

const app = express();

/**
 * Parse a PORT environment variable value.
 * Returns the parsed integer port (0-65535) or the defaultPort if unset/invalid.
 * Exits with a clear error message for configured but invalid values.
 */
function parsePort(raw: string | undefined, defaultPort: number): number {
  if (raw === undefined || raw === "") return defaultPort;
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 0 || port > 65535 || raw.trim() !== String(port)) {
    console.error(`Invalid PORT configured: "${raw}". Must be an integer between 0 and 65535.`);
    process.exit(1);
  }
  return port;
}

const port = parsePort(process.env.PORT, 4000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
