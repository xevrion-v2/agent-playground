import assert from "node:assert/strict";
import express from "express";
import { describe, it } from "node:test";

import usersRouter from "../src/routes/users.ts";

function withServer(run: (port: number) => Promise<void>) {
  const server = express();
  server.use(express.json());
  server.use("/users", usersRouter);
  return new Promise<void>((resolve, reject) => {
    const listener = server.listen(0, () => {
      const port = (listener.address() as { port: number }).port;
      run(port)
        .then(() => listener.close(() => resolve()))
        .catch((e) => listener.close(() => reject(e)));
    });
  });
}

async function post(port: number, body: unknown) {
  const r = await fetch(`http://127.0.0.1:${port}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json() };
}

describe("user creation validation", () => {
  it("rejects array bodies", async () => {
    await withServer(async (port) => {
      const r = await post(port, []);
      assert.equal(r.status, 400);
    });
  });

  it("rejects missing email", async () => {
    await withServer(async (port) => {
      const r = await post(port, { name: "Ada" });
      assert.equal(r.status, 400);
    });
  });

  it("normalizes email and ignores client id", async () => {
    await withServer(async (port) => {
      const r = await post(port, {
        id: "evil",
        email: "  Ada@Example.COM ",
        name: "  Ada  ",
        admin: true,
      });
      assert.equal(r.status, 201);
      assert.equal(r.json.data.email, "ada@example.com");
      assert.equal(r.json.data.name, "Ada");
      assert.notEqual(r.json.data.id, "evil");
      assert.equal(r.json.data.admin, undefined);
    });
  });
});
