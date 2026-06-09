// Verification script for the API ETag-disabled behavior.
// Starts the API in a child process, waits for it to listen, hits
// /health and /users, and asserts no ETag header is returned.
// Run with: npx tsx apps/api/scripts/verify-etag-disabled.ts
import { spawn, type ChildProcess } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiPath = path.resolve(__dirname, "../src/index.ts");
const tsxBin = path.resolve(__dirname, "../../../node_modules/.bin/tsx");
const port = 4998;

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

async function assertNoEtag(pathname: string): Promise<void> {
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`);
  if (response.status !== 200) {
    throw new Error(`expected 200 from ${pathname}, got ${response.status}`);
  }
  const etag = response.headers.get("etag");
  if (etag !== null) {
    throw new Error(`expected no ETag on ${pathname}, got: ${etag}`);
  }
  // body must still be valid JSON
  await response.json();
}

async function main(): Promise<void> {
  const proc = spawn(tsxBin, [apiPath], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
  try {
    await waitForLine(proc, /listening on port/i, 30000);
    await assertNoEtag("/health");
    await assertNoEtag("/users");
    console.log("OK: /health and /users return 200 with no ETag header");
  } finally {
    proc.kill();
  }
}

main().catch((error: unknown) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
