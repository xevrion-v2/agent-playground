import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(scriptDir, "../src/index.ts"), "utf8");

assert.match(source, /const\s+server\s*=\s*app\.listen\(/, "server instance must be retained");
assert.match(source, /function\s+shutdown\s*\(\s*signal:\s*NodeJS\.Signals\s*\)/, "shutdown handler must accept the signal");
assert.match(source, /server\.close\(/, "shutdown handler must close the HTTP server");
assert.match(source, /setTimeout\(/, "shutdown handler must include a forced-exit timeout");
assert.match(source, /process\.once\(\s*["']SIGTERM["']\s*,\s*\(\)\s*=>\s*shutdown\(["']SIGTERM["']\)\s*\)/, "SIGTERM must be handled once");
assert.match(source, /process\.once\(\s*["']SIGINT["']\s*,\s*\(\)\s*=>\s*shutdown\(["']SIGINT["']\)\s*\)/, "SIGINT must be handled once");

console.log("Graceful shutdown validation passed.");
