#!/usr/bin/env node
/**
 * Smoke test: verifies POST /users input validation.
 * Starts the server, runs assertions, shuts it down.
 */
import { spawn } from "child_process";
import { setTimeout as sleep } from "timers/promises";

const PORT = 4099;
const BASE = `http://localhost:${PORT}`;

const server = spawn(
  "node",
  ["--import", "tsx/esm", "src/index.ts"],
  { cwd: new URL("..", import.meta.url).pathname, env: { ...process.env, PORT: String(PORT) }, stdio: "pipe" }
);

let failed = false;

async function req(path, opts) {
  const res = await fetch(`${BASE}${path}`, opts);
  return { status: res.status, body: await res.json() };
}

async function assert(label, actual, expected) {
  if (actual !== expected) {
    console.error(`FAIL [${label}]: expected ${expected}, got ${actual}`);
    failed = true;
  } else {
    console.log(`PASS [${label}]`);
  }
}

await sleep(1500);

// Valid creation
const ok = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
});
await assert("valid user → 201", ok.status, 201);

// Missing name
const noName = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "x@y.com" }),
});
await assert("missing name → 400", noName.status, 400);

// Missing email
const noEmail = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bob" }),
});
await assert("missing email → 400", noEmail.status, 400);

// Bad email
const badEmail = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bob", email: "not-an-email" }),
});
await assert("bad email → 400", badEmail.status, 400);

// Unknown field
const extra = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bob", email: "b@b.com", role: "admin" }),
});
await assert("unknown field → 400", extra.status, 400);

// Empty body
const empty = await req("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});
await assert("empty body → 400", empty.status, 400);

server.kill("SIGTERM");
process.exit(failed ? 1 : 0);
