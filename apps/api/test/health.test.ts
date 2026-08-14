import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { test } from "node:test";

const port = 43123;
const apiRoot = new URL("..", import.meta.url);

test("GET /health returns the normalized envelope", async () => {
  const child = spawn(process.execPath, ["--import", "tsx", "src/index.ts"], {
    cwd: apiRoot,
    env: {
      ...process.env,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const ready = new Promise<void>((resolve, reject) => {
    const onData = (chunk: Buffer) => {
      if (chunk.toString().includes(`TaskFlow API listening on port ${port}`)) {
        cleanup();
        resolve();
      }
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onExit = (code: number | null, signal: NodeJS.Signals | null) => {
      cleanup();
      reject(new Error(`API exited before starting (code=${code}, signal=${signal})`));
    };

    const cleanup = () => {
      child.stdout.off("data", onData);
      child.stderr.off("data", onData);
      child.off("error", onError);
      child.off("exit", onExit);
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", onError);
    child.on("exit", onExit);
  });

  await ready;

  const response = await fetch(`http://127.0.0.1:${port}/health`);
  assert.equal(response.status, 200);

  const payload = await response.json();
  assert.deepEqual(payload, {
    status: "ok",
    data: { service: "taskflow-api" },
  });

  child.kill();
  await once(child, "exit");
});
