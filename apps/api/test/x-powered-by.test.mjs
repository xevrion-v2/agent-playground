import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "..", "src", "index.ts");

test("API disables Express x-powered-by header", () => {
  const source = fs.readFileSync(indexPath, "utf8");
  assert.match(source, /app\.disable\(["']x-powered-by["']\)/);
});
