import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import net from "node:net";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiRoot = resolve(__dirname, "..");
const repoRoot = resolve(apiRoot, "..", "..");
const tsxCliPath = resolve(repoRoot, "node_modules", "tsx", "dist", "cli.mjs");

function getFreePort() {
  return new Promise((resolvePort, reject) => {
    const server = net.createServer();

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Unable to determine free port"));
        return;
      }

      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolvePort(address.port);
      });
    });
  });
}

async function waitForServer(child, port) {
  const startupPattern = `TaskFlow API listening on port ${port}`;

  return new Promise((resolveReady, reject) => {
    let stdout = "";
    let stderr = "";

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for API startup.\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`));
    }, 15000);

    const onStdout = (chunk) => {
      stdout += chunk.toString();
      if (stdout.includes(startupPattern)) {
        cleanup();
        resolveReady();
      }
    };

    const onStderr = (chunk) => {
      stderr += chunk.toString();
    };

    const onExit = (code, signal) => {
      cleanup();
      reject(new Error(`API exited before startup (code=${code}, signal=${signal}).\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`));
    };

    function cleanup() {
      clearTimeout(timeout);
      child.stdout?.off("data", onStdout);
      child.stderr?.off("data", onStderr);
      child.off("exit", onExit);
    }

    child.stdout?.on("data", onStdout);
    child.stderr?.on("data", onStderr);
    child.on("exit", onExit);
  });
}

async function stopServer(child) {
  if (child.exitCode !== null) {
    return;
  }

  await new Promise((resolveExit, reject) => {
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
    }, 5000);

    child.once("exit", () => {
      clearTimeout(timeout);
      resolveExit();
    });
    child.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    child.kill("SIGTERM");
  });
}

const source = await readFile(resolve(apiRoot, "src", "index.ts"), "utf8");
const disableEtagLine = 'app.set("etag", false);';
const jsonMiddlewareLine = "app.use(express.json());";

assert.notEqual(source.indexOf(disableEtagLine), -1, "Expected API entrypoint to disable ETag generation");
assert(
  source.indexOf(disableEtagLine) < source.indexOf(jsonMiddlewareLine),
  "Expected ETag disabling to happen before middleware/routes are registered"
);

const port = await getFreePort();
const child = spawn(process.execPath, [tsxCliPath, "src/index.ts"], {
  cwd: apiRoot,
  env: {
    ...process.env,
    PORT: String(port)
  },
  stdio: ["ignore", "pipe", "pipe"]
});

try {
  await waitForServer(child, port);

  const healthResponse = await fetch(`http://127.0.0.1:${port}/health`);
  const healthPayload = await healthResponse.json();
  assert.equal(healthResponse.status, 200);
  assert.equal(healthResponse.headers.get("etag"), null);
  assert.deepEqual(healthPayload, { status: "ok", service: "taskflow-api" });

  const usersResponse = await fetch(`http://127.0.0.1:${port}/users`);
  const usersPayload = await usersResponse.json();
  assert.equal(usersResponse.status, 200);
  assert.equal(usersResponse.headers.get("etag"), null);
  assert.deepEqual(usersPayload, {
    data: [],
    message: "User listing is not implemented yet."
  });
} finally {
  await stopServer(child);
}
