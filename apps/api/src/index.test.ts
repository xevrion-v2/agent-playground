import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

async function startApi(port: number) {
  const child = spawn(process.execPath, ["--import", "tsx", "src/index.ts"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const started = new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(output || "Timed out waiting for API startup"));
    }, 2_000);

    child.stdout.on("data", () => {
      if (output.includes(`TaskFlow API listening on port ${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    });

    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`API exited early with code ${code}: ${output}`));
    });
  });

  await started;
  return child;
}

test("unknown API routes return a JSON 404 response", async () => {
  const port = 45951;
  const child = await startApi(port);

  try {
    const response = await fetch(`http://127.0.0.1:${port}/missing-route`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    assert.deepEqual(body, {
      error: {
        code: "not_found",
        message: "Route not found",
      },
    });
  } finally {
    child.kill();
  }
});
