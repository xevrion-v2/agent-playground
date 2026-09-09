import assert from "node:assert/strict";
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { test } from "node:test";

async function startApi(port: number): Promise<ChildProcess> {
  const command = process.platform === "win32" ? "npx tsx src/index.ts" : "npx tsx src/index.ts";
  const child = process.platform === "win32"
    ? spawn("cmd.exe", ["/d", "/s", "/c", command], {
      cwd: process.cwd(),
      env: { ...process.env, PORT: String(port) }
    })
    : spawn("npx", ["tsx", "src/index.ts"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port) }
  });

  const stderr: string[] = [];
  child.stderr.on("data", (chunk) => stderr.push(String(chunk)));

  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`API exited before startup: ${stderr.join("")}`);
    }

    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) {
        return child;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  child.kill();
  throw new Error(`API did not start: ${stderr.join("")}`);
}

async function stopApi(child: ChildProcess): Promise<void> {
  if (process.platform === "win32" && child.pid) {
    await new Promise<void>((resolve) => {
      execFile("taskkill", ["/PID", String(child.pid), "/T", "/F"], () => resolve());
    });
    return;
  }

  child.kill();
  await once(child, "close");
}

test("GET /health returns a status/data envelope", { timeout: 10_000 }, async () => {
  const port = 48104;
  const child = await startApi(port);

  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: "ok",
      data: {
        service: "taskflow-api"
      }
    });
  } finally {
    await stopApi(child);
  }
});
