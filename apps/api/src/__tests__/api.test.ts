import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import http from "node:http";
import { app } from "../index.js";

let server: http.Server;
let baseUrl: string;

before(() => {
  return new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address();
      if (addr && typeof addr === "object") {
        baseUrl = `http://127.0.0.1:${addr.port}`;
      }
      resolve();
    });
  });
});

after(() => {
  server?.close();
});

function fetchJson(path: string) {
  return new Promise<{ status: number; body: unknown }>((resolve, reject) => {
    http.get(`${baseUrl}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode ?? 0, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode ?? 0, body: data });
        }
      });
    }).on("error", reject);
  });
}

describe("API unknown route JSON 404 fallback", () => {
  it("returns JSON 404 for an unknown API route", async () => {
    const res = await fetchJson("/nonexistent-route");
    assert.strictEqual(res.status, 404);
    const obj = res.body as Record<string, unknown>;
    assert.strictEqual(obj.error, "Not Found");
    assert.ok(typeof obj.message === "string");
  });

  it("returns JSON 404 for another unknown path", async () => {
    const res = await fetchJson("/api/ghost-endpoint");
    assert.strictEqual(res.status, 404);
    const obj = res.body as Record<string, unknown>;
    assert.strictEqual(obj.error, "Not Found");
  });

  it("/health endpoint still returns 200", async () => {
    const res = await fetchJson("/health");
    assert.strictEqual(res.status, 200);
    const obj = res.body as Record<string, unknown>;
    assert.strictEqual(obj.status, "ok");
    assert.strictEqual(obj.service, "taskflow-api");
  });

  it("/users endpoint still returns 200", async () => {
    const res = await fetchJson("/users");
    assert.strictEqual(res.status, 200);
    const obj = res.body as Record<string, unknown>;
    assert.strictEqual(obj.message, "User listing is not implemented yet.");
    assert.deepStrictEqual(obj.data, []);
  });
});
