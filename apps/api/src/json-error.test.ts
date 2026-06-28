import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

test("malformed JSON returns JSON 400", async () => {
  const app = express();
  app.use(express.json());
  app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && Object.prototype.hasOwnProperty.call(err, "body")) {
      return res.status(400).json({ error: "Invalid JSON request body" });
    }
    return next(err);
  });
  app.post("/users", (_req, res) => res.status(201).json({ ok: true }));

  const response = await request(app)
    .post("/users")
    .set("Content-Type", "application/json")
    .send("{not-json");

  assert.equal(response.status, 400);
  assert.equal(response.headers["content-type"]?.includes("json"), true);
  assert.equal(response.body.error, "Invalid JSON request body");
});
