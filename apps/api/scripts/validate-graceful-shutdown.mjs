import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const port = String(45000 + Math.floor(Math.random() * 1000));
const scriptDir = dirname(fileURLToPath(import.meta.url));
const apiDir = resolve(scriptDir, "..");
const tsxCli = require.resolve("tsx/cli");
const shutdownSignal = process.platform === "win32" ? "SIGINT" : "SIGTERM";

const child = spawn(process.execPath, [tsxCli, "src/index.ts"], {
  cwd: apiDir,
  env: {
    ...process.env,
    PORT: port,
    GRACEFUL_SHUTDOWN_TIMEOUT_MS: "2000",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let stdout = "";
let stderr = "";

child.stdout.setEncoding("utf8");
child.stderr.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  stdout += chunk;
});
child.stderr.on("data", (chunk) => {
  stderr += chunk;
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth() {
  const deadline = Date.now() + 10000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) {
        return;
      }
    } catch {
      await wait(100);
    }
  }

  throw new Error(`API server did not become healthy. stdout=${stdout} stderr=${stderr}`);
}

function waitForExit({ allowSignalExit = false } = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`API server did not exit after ${shutdownSignal}. stdout=${stdout} stderr=${stderr}`));
    }, 5000);

    child.once("exit", (code, signal) => {
      clearTimeout(timer);
      if ((code === 0 && signal === null) || (allowSignalExit && signal !== null)) {
        resolve();
        return;
      }

      reject(new Error(`Expected clean exit after ${shutdownSignal}, got code=${code} signal=${signal}. stdout=${stdout} stderr=${stderr}`));
    });
  });
}

async function validateShutdownSource() {
  const source = await readFile(resolve(apiDir, "src", "index.ts"), "utf8");
  const requiredSnippets = [
    "const server = app.listen",
    "server.close",
    'process.once("SIGTERM", shutdown)',
    'process.once("SIGINT", shutdown)',
  ];

  for (const snippet of requiredSnippets) {
    if (!source.includes(snippet)) {
      throw new Error(`Missing graceful shutdown source snippet: ${snippet}`);
    }
  }
}

try {
  await waitForHealth();
  await validateShutdownSource();
  if (process.platform === "win32") {
    child.kill();
    await waitForExit({ allowSignalExit: true });
    console.log("Graceful shutdown source validation passed");
    process.exit(0);
  }

  child.kill(shutdownSignal);
  await waitForExit();
  console.log("Graceful shutdown validation passed");
} catch (error) {
  child.kill("SIGKILL");
  console.error(error);
  process.exit(1);
}
