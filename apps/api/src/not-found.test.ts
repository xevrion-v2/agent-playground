import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

test("unknown routes return JSON 404", async () => {
  const app = express();
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  const response = await request(app).get("/missing");
  assert.equal(response.status, 404);
  assert.equal(response.headers["content-type"]?.includes("json"), true);
  assert.equal(response.body.error, "Route not found");
});
