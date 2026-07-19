import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, "..", "src", "index.ts");
const source = await readFile(indexPath, "utf8");

const requiredSnippets = [
  "const server: Server = app.listen",
  "server.close((error) =>",
  'process.on("SIGTERM", shutdown)',
  'process.on("SIGINT", shutdown)',
  "setTimeout(() =>",
  "process.exit(0)",
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

if (missing.length > 0) {
  console.error("Graceful shutdown validation failed. Missing snippets:");
  for (const snippet of missing) {
    console.error(`- ${snippet}`);
  }
  process.exit(1);
}

console.log("Graceful shutdown validation passed.");
