import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = 4800 + Math.floor(Math.random() * 1000);
const baseUrl = `http://127.0.0.1:${port}`;
const tsxCommand = process.platform === "win32" ? "tsx.cmd" : "tsx";

const server = spawn(tsxCommand, ["src/index.ts"], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  env: {
    ...process.env,
    PORT: String(port)
  },
  stdio: ["ignore", "pipe", "pipe"]
});

let serverOutput = "";
let serverError: Error | undefined;
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.on("error", (error) => {
  serverError = error;
});

async function waitForServer() {
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    if (serverError) {
      throw serverError;
    }

    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`API did not start on ${baseUrl}\n${serverOutput}`);
}

async function assertResponse(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  await waitForServer();

  const listResponse = await fetch(`${baseUrl}/users`);
  await assertResponse(listResponse.status === 200, "GET /users should still return 200");

  const createResponse = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: "Ada Lovelace", email: "ada@example.com" })
  });
  await assertResponse(createResponse.status === 201, "POST /users should still return 201");

  const deleteResponse = await fetch(`${baseUrl}/users`, {
    method: "DELETE"
  });
  const deleteBody = await deleteResponse.json();

  await assertResponse(deleteResponse.status === 405, "DELETE /users should return 405");
  await assertResponse(
    deleteResponse.headers.get("allow") === "GET, POST",
    "DELETE /users should expose Allow: GET, POST"
  );
  await assertResponse(
    deleteBody.error?.code === "method_not_allowed",
    "DELETE /users should return a method_not_allowed error"
  );
  await assertResponse(
    Array.isArray(deleteBody.error?.allowedMethods) &&
      deleteBody.error.allowedMethods.join(",") === "GET,POST",
    "DELETE /users should list the supported methods"
  );
}

try {
  await run();
  console.log("users method validation passed");
} finally {
  server.kill("SIGTERM");
}
