import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import { type AddressInfo, createServer } from "node:net";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

async function getFreePort() {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address() as AddressInfo;
  server.close();
  await once(server, "close");
  return port;
}

async function stopServer(child: ChildProcessWithoutNullStreams) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  child.kill("SIGTERM");

  const exited = once(child, "exit");
  const timeout = delay(1_000).then(() => {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
    }
  });

  await Promise.race([exited, timeout]);
}

test("GET /health sends a no-store cache policy", async () => {
  const port = await getFreePort();
  const apiRoot = fileURLToPath(new URL("..", import.meta.url));
  const output: string[] = [];
  const child = spawn("tsx", ["src/index.ts"], {
    cwd: apiRoot,
    env: {
      ...process.env,
      PORT: String(port)
    }
  });

  child.stdout.on("data", (chunk) => output.push(String(chunk)));
  child.stderr.on("data", (chunk) => output.push(String(chunk)));

  try {
    let response: Response | undefined;

    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (child.exitCode !== null) {
        assert.fail(`API process exited early:\n${output.join("")}`);
      }

      try {
        response = await fetch(`http://127.0.0.1:${port}/health`);
        break;
      } catch {
        await delay(100);
      }
    }

    assert.ok(response, `API did not start:\n${output.join("")}`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      status: "ok",
      service: "taskflow-api"
    });
  } finally {
    await stopServer(child);
  }
});
