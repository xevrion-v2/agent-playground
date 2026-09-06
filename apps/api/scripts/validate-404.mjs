#!/usr/bin/env node
import { spawn } from "child_process";
import { setTimeout as sleep } from "timers/promises";

const PORT = 4098;
const BASE = `http://localhost:${PORT}`;

const server = spawn(
  "node",
  ["--import", "tsx/esm", "src/index.ts"],
  { cwd: new URL("..", import.meta.url).pathname, env: { ...process.env, PORT: String(PORT) }, stdio: "pipe" }
);

let failed = false;

async function assert(label, actual, expected) {
  if (actual !== expected) {
    console.error(`FAIL [${label}]: expected ${expected}, got ${actual}`);
    failed = true;
  } else {
    console.log(`PASS [${label}]`);
  }
}

await sleep(1500);

const res = await fetch(`${BASE}/unknown-route`);
const body = await res.json();
await assert("unknown route status 404", res.status, 404);
await assert("body has error field", typeof body.error, "string");
await assert("content-type is json", res.headers.get("content-type")?.includes("application/json"), true);

const health = await fetch(`${BASE}/health`);
await assert("/health still 200", health.status, 200);

server.kill("SIGTERM");
process.exit(failed ? 1 : 0);
