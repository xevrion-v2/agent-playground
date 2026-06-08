import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { test } from "node:test";

async function waitForServer(port: number) {
  const deadline = Date.now() + 5000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error("API server did not become ready");
}

test("malformed JSON request bodies return a JSON 400 response", async () => {
  const port = 4517;
  const server = spawn("tsx", ["src/index.ts"], {
    cwd: new URL("..", import.meta.url),
    env: {
      ...process.env,
      PORT: String(port)
    },
    stdio: "ignore"
  });

  try {
    await waitForServer(port);

    const response = await fetch(`http://127.0.0.1:${port}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: "{\"name\":"
    });

    assert.equal(response.status, 400);
    assert.equal(response.headers.get("content-type")?.includes("application/json"), true);
    assert.deepEqual(await response.json(), {
      error: "Invalid JSON request body"
    });
  } finally {
    server.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      server.once("exit", () => resolve());
    });
  }
});
