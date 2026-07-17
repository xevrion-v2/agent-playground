import assert from "node:assert/strict";
import express from "express";
import { describe, it } from "node:test";

import { JSON_BODY_LIMIT } from "../src/config";

describe("JSON body limit", () => {
  it("uses conservative 32kb limit", () => {
    assert.equal(JSON_BODY_LIMIT, "32kb");
  });

  it("rejects oversized payloads with 413", async () => {
    const app = express();
    app.use(express.json({ limit: JSON_BODY_LIMIT }));
    app.post("/x", (_req, res) => res.json({ ok: true }));

    await new Promise<void>((resolve, reject) => {
      const server = app.listen(0, async () => {
        try {
          const port = (server.address() as { port: number }).port;
          const big = "x".repeat(40_000);
          const r = await fetch(`http://127.0.0.1:${port}/x`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ big }),
          });
          assert.equal(r.status, 413);
          server.close(() => resolve());
        } catch (e) {
          server.close(() => reject(e));
        }
      });
    });
  });
});
