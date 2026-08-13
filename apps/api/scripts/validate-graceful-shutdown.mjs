import { spawn } from "node:child_process";

const port = 4099;
const child = spawn(process.execPath, ["--import", "tsx/esm", "src/index.ts"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

let stdout = "";
child.stdout.on("data", (chunk) => {
  stdout += chunk.toString();
});

function fail(message) {
  console.error(`FAIL: ${message}`);
  child.kill("SIGKILL");
  process.exit(1);
}

await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("server did not start in time")), 5000);
  const check = setInterval(() => {
    if (stdout.includes("listening on port")) {
      clearInterval(check);
      clearTimeout(timer);
      resolve();
    }
  }, 50);
}).catch((err) => fail(err.message));

child.kill("SIGTERM");

const exitCode = await new Promise((resolve) => {
  child.once("exit", (code) => resolve(code));
});

if (exitCode !== 0) {
  fail(`process exited with code ${exitCode} after SIGTERM (expected 0)`);
}

console.log("PASS: API server closes cleanly on SIGTERM");
