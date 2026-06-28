import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import express from "express";
import usersRouter from "./users";

/**
 * Helper: start an Express app on a random port and return its URL.
 */
function createTestApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

function request(
  app: express.Express,
  method: string,
  path: string,
  body?: unknown
): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        server.close();
        return reject(new Error("Could not get server address"));
      }
      const port = addr.port;

      const options: http.RequestOptions = {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: { "Content-Type": "application/json" },
      };

      const req = http.request(options, (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          server.close();
          resolve({
            status: res.statusCode || 0,
            data: JSON.parse(raw),
          });
        });
      });

      req.on("error", (err) => {
        server.close();
        reject(err);
      });

      if (body !== undefined) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  });
}

describe("GET /users", () => {
  let app: express.Express;

  before(() => {
    app = createTestApp();
  });

  it("should return 200 with an empty data array", async () => {
    const { status, data } = await request(app, "GET", "/users");
    assert.equal(status, 200);
    assert.ok(Array.isArray(data.data));
    assert.equal(data.data.length, 0);
  });

  it("should include a descriptive message", async () => {
    const { data } = await request(app, "GET", "/users");
    assert.ok(typeof data.message === "string");
    assert.ok(data.message.length > 0);
  });
});

describe("POST /users", () => {
  let app: express.Express;

  before(() => {
    app = createTestApp();
  });

  it("should return 201 with a stub user id", async () => {
    const payload = { name: "Alice", email: "alice@example.com" };
    const { status, data } = await request(app, "POST", "/users", payload);
    assert.equal(status, 201);
    assert.equal(data.data.id, "stub-user-id");
  });

  it("should echo back the request body fields", async () => {
    const payload = { name: "Bob", role: "admin" };
    const { data } = await request(app, "POST", "/users", payload);
    assert.equal(data.data.name, "Bob");
    assert.equal(data.data.role, "admin");
  });

  it("should return a descriptive message", async () => {
    const { data } = await request(app, "POST", "/users", {});
    assert.ok(typeof data.message === "string");
    assert.ok(data.message.length > 0);
  });
});
