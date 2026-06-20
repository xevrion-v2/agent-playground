// Verification script for the /health no-store cache policy.
// Starts the API in a child process, waits for it to listen, fetches
// /health, and asserts the Cache-Control header is no-store.
// Run with: npx tsx apps/api/scripts/verify-health-cache.ts
import { spawn, type ChildProcess } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiPath = path.resolve(__dirname, "../src/index.ts");
const tsxBin = path.resolve(__dirname, "../../../node_modules/.bin/tsx");
const port = 4999;

function waitForLine(proc: ChildProcess, matcher: RegExp, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => {
      proc.kill();
      reject(new Error(`timed out waiting for ${matcher} (saw: ${buffer})`));
    }, timeoutMs);
    const onChunk = (chunk: Buffer | string) => {
      buffer += chunk.toString();
      let newline = buffer.indexOf("\n");
      while (newline !== -1) {
        const line = buffer.slice(0, newline);
        if (matcher.test(line)) {
          clearTimeout(timer);
          proc.stdout?.off("data", onChunk);
          proc.stderr?.off("data", onChunk);
          resolve();
          return;
        }
        buffer = buffer.slice(newline + 1);
        newline = buffer.indexOf("\n");
      }
    };
    proc.stdout?.on("data", onChunk);
    proc.stderr?.on("data", onChunk);
    proc.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`child exited with code ${code} before listening (saw: ${buffer})`));
    });
  });
}

async function main(): Promise<void> {
  const proc = spawn(tsxBin, [apiPath], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
  try {
    await waitForLine(proc, /listening on port/i, 30000);
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    if (response.status !== 200) {
      throw new Error(`expected 200, got ${response.status}`);
    }
    const cacheControl = response.headers.get("cache-control") ?? "";
    if (!cacheControl.toLowerCase().includes("no-store")) {
      throw new Error(
        `expected Cache-Control to include no-store, got: ${cacheControl || "<missing>"}`
      );
    }
    const payload = (await response.json()) as {
      status?: string;
      service?: string;
    };
    if (payload.status !== "ok" || payload.service !== "taskflow-api") {
      throw new Error(`unexpected body: ${JSON.stringify(payload)}`);
    }
    console.log("OK: /health returns 200 with Cache-Control: no-store");
  } finally {
    proc.kill();
  }
}

main().catch((error: unknown) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
