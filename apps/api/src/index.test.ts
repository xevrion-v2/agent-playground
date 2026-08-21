import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

test("importing the API entrypoint exports the app without starting a listener", async () => {
  const script = `
    const mod = await import("./src/index.ts");
    if (!mod.app || typeof mod.app.use !== "function") {
      process.exit(2);
    }
  `;

  const child = spawn(process.execPath, ["--import", "tsx", "--eval", script], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, PORT: "0" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  const result = await new Promise<{ code: number | null; timedOut: boolean }>((resolve) => {
    const timeout = setTimeout(() => {
      child.kill();
      resolve({ code: null, timedOut: true });
    }, 750);

    child.on("exit", (code) => {
      clearTimeout(timeout);
      resolve({ code, timedOut: false });
    });
  });

  assert.equal(result.timedOut, false, output);
  assert.equal(result.code, 0, output);
  assert.equal(output.includes("TaskFlow API listening"), false, output);
});
