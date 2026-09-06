import express from "express";

import usersRouter from "./routes/users";
/**
 * Checks whether a string contains the specified whitespace or control symbol.
 * @param str - The string to search.
 * @param symbol - A single-character whitespace/control token (e.g. '\t', '\n', '\r', ' ').
 * @returns true if the symbol is present in the string; false otherwise.
 */
export function isTabSymbolPresent(str: string, symbol: string = '\t'): boolean {
  if (typeof str !== 'string' || typeof symbol !== 'string' || symbol.length === 0) {
    return false;
  }
  return str.includes(symbol);
}


const app = express();
const port = process.env.PORT || 4000;
export default app;
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
