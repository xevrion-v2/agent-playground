import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = String(4600 + Math.floor(Math.random() * 1000));
const baseUrl = `http://127.0.0.1:${port}`;
const serverCommand = process.platform === "win32" ? "cmd.exe" : "npm";
const serverArgs =
  process.platform === "win32"
    ? ["/d", "/s", "/c", "npm", "run", "dev"]
    : ["run", "dev"];
const logs = [];

const server = spawn(serverCommand, serverArgs, {
  cwd: process.cwd(),
  detached: process.platform !== "win32",
  env: {
    ...process.env,
    PORT: port
  },
  stdio: ["ignore", "pipe", "pipe"]
});

server.stdout.on("data", (chunk) => logs.push(chunk.toString()));
server.stderr.on("data", (chunk) => logs.push(chunk.toString()));

function waitForExit(timeoutMs = 5000) {
  if (server.exitCode !== null) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, timeoutMs);
    server.once("exit", () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

async function stopServer() {
  if (server.exitCode !== null) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
      stdio: "ignore"
    });
  } else {
    process.kill(-server.pid, "SIGTERM");
  }

  await waitForExit();
  server.stdout.destroy();
  server.stderr.destroy();
}

async function waitForServer() {
  const deadline = Date.now() + 8000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`API server exited early.\n${logs.join("")}`);
    }

    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the server binds the port.
    }

    await delay(200);
  }

  throw new Error(`Timed out waiting for API server.\n${logs.join("")}`);
}

let exitCode = 0;

try {
  await waitForServer();

  const response = await fetch(`${baseUrl}/missing-route`);
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.json();

  if (response.status !== 404) {
    throw new Error(`Expected 404 for missing route, received ${response.status}.`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON content type, received "${contentType}".`);
  }

  if (body.error !== "Not Found" || body.message !== "Route not found") {
    throw new Error(`Unexpected 404 JSON body: ${JSON.stringify(body)}`);
  }

  console.log("API missing-route JSON 404 validation passed.");
} catch (error) {
  exitCode = 1;
  console.error(error);
} finally {
  await stopServer();
}

process.exit(exitCode);
