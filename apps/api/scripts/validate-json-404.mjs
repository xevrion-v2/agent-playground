import { spawn } from "node:child_process";
import http from "node:http";

const port = 4097;
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

const response = await new Promise((resolve, reject) => {
  http.get(`http://localhost:${port}/does-not-exist`, resolve).on("error", reject);
});

const chunks = [];
for await (const chunk of response) chunks.push(chunk);
const body = Buffer.concat(chunks).toString();

child.kill("SIGTERM");

if (response.statusCode !== 404) {
  fail(`expected status 404, got ${response.statusCode}`);
}
if (!response.headers["content-type"]?.includes("application/json")) {
  fail(`expected application/json content-type, got ${response.headers["content-type"]}`);
}
JSON.parse(body);

console.log("PASS: unknown routes return JSON 404 responses");
