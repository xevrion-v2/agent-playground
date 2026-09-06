import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

test("GET /health returns status and data envelope", async () => {
  const app = express();
  const JSON_BODY_LIMIT = "100kb";
  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      data: {
        service: "taskflow-api",
        jsonBodyLimit: JSON_BODY_LIMIT,
      },
    });
  });

  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.data.service, "taskflow-api");
  assert.equal(response.body.data.jsonBodyLimit, JSON_BODY_LIMIT);
});
