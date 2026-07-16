import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

type ApiModule = typeof import("./index.ts");

let apiModule: ApiModule | undefined;

async function loadApi() {
  apiModule ??= await import("./index.ts");
  return apiModule;
}

function request(app: ApiModule["app"], path: string) {
  const server = http.createServer(app);

  return new Promise<{ status: number; body: unknown }>((resolve, reject) => {
    server.listen(0, async () => {
      try {
        const address = server.address();
        assert(address && typeof address === "object");

        const response = await fetch(`http://127.0.0.1:${address.port}${path}`);
        const body = await response.json();
        resolve({ status: response.status, body });
      } catch (error) {
        reject(error);
      } finally {
        server.close();
      }
    });
    server.once("error", reject);
  });
}

test("importing the API entrypoint does not start a listener", async () => {
  const originalListen = http.Server.prototype.listen;
  let listenCalls = 0;

  http.Server.prototype.listen = function patchedListen(...args: Parameters<typeof originalListen>) {
    listenCalls += 1;
    return originalListen.apply(this, args);
  } as typeof originalListen;

  try {
    await loadApi();
  } finally {
    http.Server.prototype.listen = originalListen;
  }

  assert.equal(listenCalls, 0);
});

test("health route still responds", async () => {
  const { app } = await loadApi();
  const response = await request(app, "/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok", service: "taskflow-api" });
});

test("users route still responds", async () => {
  const { app } = await loadApi();
  const response = await request(app, "/users");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    data: [],
    message: "User listing is not implemented yet."
  });
});
