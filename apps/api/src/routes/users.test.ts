import { describe, it } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import http from "http";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

function listen(app: express.Express): Promise<{ port: number; server: http.Server }> {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const addr = server.address() as { port: number };
      resolve({ port: addr.port, server });
    });
  });
}

describe("GET /users", () => {
  it("returns 200 with empty data array and message", async () => {
    const app = createApp();
    const { port, server } = await listen(app);
    try {
      const res = await fetch(`http://localhost:${port}/users`);
      const body = await res.json();
      assert.equal(res.status, 200);
      assert.deepEqual(body.data, []);
      assert.equal(body.message, "User listing is not implemented yet.");
    } finally {
      server.close();
    }
  });
});

describe("POST /users", () => {
  it("returns 201 with stub user id", async () => {
    const app = createApp();
    const { port, server } = await listen(app);
    try {
      const res = await fetch(`http://localhost:${port}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const body = await res.json();
      assert.equal(res.status, 201);
      assert.equal(body.data.id, "stub-user-id");
      assert.equal(body.message, "User creation is not implemented yet.");
    } finally {
      server.close();
    }
  });

  it("echoes request body fields", async () => {
    const app = createApp();
    const { port, server } = await listen(app);
    try {
      const res = await fetch(`http://localhost:${port}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", role: "admin" }),
      });
      const body = await res.json();
      assert.equal(res.status, 201);
      assert.equal(body.data.name, "Alice");
      assert.equal(body.data.role, "admin");
      assert.equal(body.data.id, "stub-user-id");
    } finally {
      server.close();
    }
  });
});
