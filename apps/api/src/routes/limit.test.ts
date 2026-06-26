import test from "node:test";
import assert from "node:assert";
import { Server } from "http";
import app from "../app";

test("POST /users JSON body size limit", async (t) => {
  let server: Server;
  let baseUrl: string;

  t.before(() => {
    return new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        const port = typeof address === "object" && address !== null ? address.port : 0;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  t.after(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  await t.test("accepts request body within 100kb limit", async () => {
    const smallName = "a".repeat(1024); // 1kb
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", name: smallName })
    });
    // The route isn't fully implemented but should return 201 stub
    assert.strictEqual(res.status, 201);
  });

  await t.test("rejects request body exceeding 100kb limit with 413", async () => {
    const largeName = "a".repeat(101 * 1024); // 101kb
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", name: largeName })
    });
    // Express JSON parser should reject with 413 Payload Too Large
    assert.strictEqual(res.status, 413);
  });
});
