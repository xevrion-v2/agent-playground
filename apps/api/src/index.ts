import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

/**
 * Checks whether a string contains the form-feed control symbol (U+000C).
 * @param input - The string to inspect.
 * @returns True if the form-feed symbol is present; otherwise false.
 */
export function isFormFeedSymbolPresent(input: string): boolean {
  return input.includes('\f');
}

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
