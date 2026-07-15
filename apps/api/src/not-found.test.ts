import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";

import usersRouter from "./routes/users.ts";

function createApp() {
  const app = express();
  app.use(express.json({ limit: "100kb" }));
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });
  app.use("/users", usersRouter);
  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  return app;
}

test("unknown routes return JSON 404", async () => {
  const response = await request(createApp()).get("/missing-route");
  assert.equal(response.status, 404);
  assert.equal(response.headers["content-type"]?.includes("json"), true);
  assert.equal(response.body.error, "Route not found");
});

test("health and users routes remain unchanged", async () => {
  const app = createApp();
  const health = await request(app).get("/health");
  assert.equal(health.status, 200);
  assert.equal(health.body.service, "taskflow-api");

  const users = await request(app).post("/users").send({ email: "ok@example.com" });
  assert.equal(users.status, 201);
});
