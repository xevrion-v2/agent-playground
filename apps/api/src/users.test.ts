import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import express from "express";
import usersRouter from "./routes/users.js";

function startTestServer(): Promise<{ url: string; close: () => void }> {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());
    app.use("/users", usersRouter);
    const server = app.listen(0, () => {
      const addr = server.address() as { port: number };
      resolve({
        url: `http://127.0.0.1:${addr.port}`,
        close: () => server.close(),
      });
    });
  });
}

function fetchJSON(
  url: string,
  opts?: RequestInit
): Promise<{ status: number; body: any }> {
  return fetch(url, opts).then(async (res) => ({
    status: res.status,
    body: await res.json(),
  }));
}

describe("user routes", () => {
  let baseURL: string;
  let close: () => void;

  before(async () => {
    const server = await startTestServer();
    baseURL = server.url;
    close = server.close;
  });

  after(() => close());

  describe("GET /users", () => {
    it("returns 200 with empty data array", async () => {
      const { status, body } = await fetchJSON(`${baseURL}/users`);
      assert.equal(status, 200);
      assert.deepEqual(body.data, []);
    });

    it("includes a message field", async () => {
      const { body } = await fetchJSON(`${baseURL}/users`);
      assert.ok(body.message, "expected a message field");
      assert.ok(typeof body.message === "string");
    });
  });

  describe("POST /users", () => {
    it("returns 201 status", async () => {
      const { status } = await fetchJSON(`${baseURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", email: "alice@test.com" }),
      });
      assert.equal(status, 201);
    });

    it("returns stub user with provided fields", async () => {
      const payload = { name: "Bob", email: "bob@test.com" };
      const { body } = await fetchJSON(`${baseURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      assert.equal(body.data.name, "Bob");
      assert.equal(body.data.email, "bob@test.com");
    });

    it("includes a stub id in the response", async () => {
      const { body } = await fetchJSON(`${baseURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test" }),
      });
      assert.ok(body.data.id, "expected an id field");
    });

    it("includes a message field", async () => {
      const { body } = await fetchJSON(`${baseURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test" }),
      });
      assert.ok(body.message, "expected a message field");
    });
  });
});
