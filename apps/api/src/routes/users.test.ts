import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import express from "express";

import usersRouter from "./users";

function createUsersApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

test("POST /users rejects missing or empty JSON bodies", async () => {
  const app = createUsersApp();

  const emptyObject = await request(app).post("/users").send({});
  assert.equal(emptyObject.status, 400);
  assert.equal(emptyObject.body.error, "Request body must be a non-empty JSON object.");

  const arrayBody = await request(app).post("/users").send(["not-an-object"]);
  assert.equal(arrayBody.status, 400);

  const stringBody = await request(app).post("/users").send("not-json-object");
  assert.equal(stringBody.status, 400);
});

test("POST /users preserves stub response for valid payloads", async () => {
  const response = await request(createUsersApp())
    .post("/users")
    .send({ email: "ada@example.com", name: "Ada" });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.id, "stub-user-id");
  assert.equal(response.body.data.email, "ada@example.com");
});
