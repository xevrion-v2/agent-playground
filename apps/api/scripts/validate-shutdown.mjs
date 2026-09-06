/**
 * Validates graceful shutdown: starts the API server, sends SIGTERM,
 * and confirms the process exits cleanly within the timeout window.
 */
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = 4099;
const server = spawn(
  "node",
  ["--import", "tsx/esm", "src/index.ts"],
  {
    cwd: new URL("..", import.meta.url).pathname,
    env: { ...process.env, PORT: String(PORT) },
    stdio: "pipe",
  }
);

let output = "";
server.stdout.on("data", (d) => (output += d));
server.stderr.on("data", (d) => (output += d));

await delay(1500);

if (!output.includes("listening")) {
  console.error("Server did not start. Output:", output);
  server.kill("SIGKILL");
  process.exit(1);
}

console.log("Server started. Sending SIGTERM...");
server.kill("SIGTERM");

const exitCode = await new Promise((resolve) => {
  const timer = setTimeout(() => resolve(null), 5000);
  server.on("exit", (code) => { clearTimeout(timer); resolve(code); });
});

if (exitCode === null) {
  console.error("Server did not exit within 5s after SIGTERM.");
  server.kill("SIGKILL");
  process.exit(1);
}

console.log(`Server exited with code ${exitCode}. Graceful shutdown OK.`);
process.exit(exitCode === 0 ? 0 : 1);
