import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";

const port = 43123;
const apiRoot = new URL("..", import.meta.url);
const apiUrl = `http://127.0.0.1:${port}`;

let server: ChildProcessWithoutNullStreams | null = null;

async function waitForServerReady(child: ChildProcessWithoutNullStreams): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const onData = (chunk: Buffer) => {
      if (chunk.toString().includes(`TaskFlow API listening on port ${port}`)) {
        cleanup();
        resolve();
      }
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onExit = (code: number | null, signal: NodeJS.Signals | null) => {
      cleanup();
      reject(new Error(`API exited before starting (code=${code}, signal=${signal})`));
    };

    const cleanup = () => {
      child.stdout.off("data", onData);
      child.stderr.off("data", onData);
      child.off("error", onError);
      child.off("exit", onExit);
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", onError);
    child.on("exit", onExit);
  });
}

before(async () => {
  server = spawn(process.execPath, ["src/index.ts"], {
    cwd: apiRoot,
    env: {
      ...process.env,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  await waitForServerReady(server);
});

after(async () => {
  if (!server) {
    return;
  }

  if (server.exitCode === null && server.signalCode === null) {
    server.kill();
  }

  await once(server, "exit");
});

test("POST /users rejects non-object JSON bodies", async () => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(["not", "an", "object"]),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Validation failed",
    details: {
      body: ["Request body must be a JSON object."],
    },
  });
});

test("POST /users normalizes the email and optional name while ignoring extra fields", async () => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: "client-id",
      email: "  Ada@Example.COM  ",
      name: "  Ada Lovelace  ",
      role: "admin",
    }),
  });

  assert.equal(response.status, 201);

  const payload = await response.json() as {
    data: {
      id: string;
      email: string;
      name?: string;
    };
    message: string;
  };

  assert.equal(payload.message, "User created");
  assert.notEqual(payload.data.id, "client-id");
  assert.match(payload.data.id, /^[0-9a-f-]{36}$/i);
  assert.deepEqual(payload.data, {
    id: payload.data.id,
    email: "ada@example.com",
    name: "Ada Lovelace",
  });
});

test("POST /users rejects invalid email addresses", async () => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: "not-an-email",
      name: "Ada",
    }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Validation failed",
    details: {
      email: ["A valid email address is required."],
    },
  });
});
