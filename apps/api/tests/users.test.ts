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
      run(port).then(() => listener.close(() => resolve())).catch((e) => listener.close(() => reject(e)));
    });
  });
}

describe("users routes", () => {
  it("GET / returns empty list stub", async () => {
    await withServer(async (port) => {
      const r = await fetch(`http://127.0.0.1:${port}/users`);
      assert.equal(r.status, 200);
      assert.deepEqual((await r.json()).data, []);
    });
  });
  it("POST / echoes body in stub response", async () => {
    await withServer(async (port) => {
      const r = await fetch(`http://127.0.0.1:${port}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "a@b.co", name: "Ada" }),
      });
      const j = await r.json();
      assert.equal(r.status, 201);
      assert.equal(j.data.id, "stub-user-id");
      assert.equal(j.data.email, "a@b.co");
    });
  });
});
