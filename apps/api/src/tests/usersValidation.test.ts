import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { after, before, describe, it } from "node:test";

const port = 45157;
const baseUrl = `http://127.0.0.1:${port}`;
const apiRoot = fileURLToPath(new URL("../../../", import.meta.url));
let server: ChildProcessWithoutNullStreams;

function waitForServerReady(process: ChildProcessWithoutNullStreams): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timed out waiting for API server to start."));
    }, 10_000);

    process.stdout.on("data", (chunk: Buffer) => {
      if (chunk.toString().includes("TaskFlow API listening")) {
        clearTimeout(timeout);
        resolve();
      }
    });

    process.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      if (text.includes("EADDRINUSE")) {
        clearTimeout(timeout);
        reject(new Error(text));
      }
    });

    process.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`API server exited before readiness with code ${code}.`));
    });
  });
}

async function postUser(payload: unknown): Promise<Response> {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

describe("POST /users validation", () => {
  before(async () => {
    server = spawn(process.execPath, ["--import", "tsx", "src/index.ts"], {
      cwd: apiRoot,
      env: {
        ...process.env,
        PORT: String(port)
      }
    });

    await waitForServerReady(server);
  });

  after(() => {
    server.kill();
  });

  it("rejects missing or blank names", async () => {
    const missingName = await postUser({ email: "person@example.com" });
    assert.equal(missingName.status, 400);
    assert.deepEqual(await missingName.json(), {
      error: "Name must be a non-empty string."
    });

    const blankName = await postUser({ name: "   ", email: "person@example.com" });
    assert.equal(blankName.status, 400);
  });

  it("rejects missing, blank, and malformed email values", async () => {
    for (const email of [undefined, "", "   ", "not-an-email", "person@", "@example.com"]) {
      const response = await postUser({ name: "Ada", email });
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), {
        error: "Email must be a valid non-empty email address."
      });
    }
  });

  it("accepts a valid name and email", async () => {
    const response = await postUser({
      name: "Ada Lovelace",
      email: "ada@example.com"
    });

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      data: {
        id: "stub-user-id",
        name: "Ada Lovelace",
        email: "ada@example.com"
      },
      message: "User creation is not implemented yet."
    });
  });
});
