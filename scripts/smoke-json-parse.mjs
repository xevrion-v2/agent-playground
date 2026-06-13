import http from "node:http";
import { spawn, spawnSync } from "node:child_process";

const port = 4571;
const server = spawn(
  process.platform === "win32" ? "cmd.exe" : "./node_modules/.bin/tsx",
  process.platform === "win32"
    ? ["/c", "node_modules\\.bin\\tsx.cmd", "apps/api/src/index.ts"]
    : ["apps/api/src/index.ts"],
  {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});

const stopServer = () => {
  if (server.killed) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill.exe", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore"
    });
  } else {
    server.kill();
  }
};

const request = ({ path, method = "GET", body }) =>
  new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: { "Content-Type": "application/json" },
        timeout: 3000
      },
      (res) => {
        let responseBody = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => resolve({ res, body: responseBody }));
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error(`Timed out requesting ${path}`));
    });
    req.on("error", reject);
    req.end(body);
  });
 
const waitForServer = async () => {
  const deadline = Date.now() + 8000;

  while (Date.now() < deadline) {
    try {
      await request({ path: "/health" });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  throw new Error(`API did not start. Output:\n${serverOutput}`);
};

const requestMalformedJson = () =>
  request({
    path: "/users",
    method: "POST",
    body: '{"name":'
  });

try {
  await waitForServer();
  const { res, body } = await requestMalformedJson();
  const parsed = JSON.parse(body);

  if (res.statusCode !== 400) {
    throw new Error(`Expected 400, received ${res.statusCode}`);
  }

  const contentType = res.headers["content-type"] ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON content type, received ${contentType}`);
  }

  if (parsed.error !== "Invalid JSON request body") {
    throw new Error(`Unexpected error payload: ${body}`);
  }

  console.log("Malformed JSON smoke test passed.");
} catch (error) {
  console.error(serverOutput);
  console.error(error);
  process.exitCode = 1;
} finally {
  stopServer();
}
