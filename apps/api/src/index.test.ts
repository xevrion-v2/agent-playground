import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { fileURLToPath } from "node:url";

import request from "supertest";

import { app, createApp } from "./index";

test("importing the API entrypoint exits without starting a listener", async () => {
  const child = spawn(
    process.execPath,
    ["--import", "tsx", "--input-type=module", "--eval", "await import('./src/index.ts');"],
    {
      cwd: fileURLToPath(new URL("..", import.meta.url)),
      env: { ...process.env, PORT: "0" },
      stdio: ["ignore", "pipe", "pipe"]
    }
  );

  let output = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });

  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
  }, 2000);

  const [code, signal] = await once(child, "exit");
  clearTimeout(timeout);

  assert.equal(signal, null, "importing index.ts should not leave a server listener running");
  assert.equal(code, 0);
  assert.equal(output.includes("TaskFlow API listening"), false);
});

test("exports an Express app for in-memory health route tests", async () => {
  assert.equal(typeof app, "function");
  assert.equal(typeof app.listen, "function");

  const response = await request(app).get("/health").expect(200);

  assert.deepEqual(response.body, {
    status: "ok",
    service: "taskflow-api"
  });
});

test("createApp preserves the users route behavior for in-memory tests", async () => {
  const testApp = createApp();

  const response = await request(testApp).get("/users").expect(200);

  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});
