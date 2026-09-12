import { describe, it } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("POST /users", () => {
  it("should create a user with valid email and name, normalizing values", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "  Test@Example.COM  ", name: "  John Doe  " });
    assert.equal(res.status, 201);
    assert.equal(res.body.message, "User created successfully.");
    assert.ok(res.body.data.id);
    assert.equal(typeof res.body.data.id, "string");
    // email is lowercased
    assert.equal(res.body.data.email, "test@example.com");
    // name is trimmed
    assert.equal(res.body.data.name, "John Doe");
  });

  it("should create a user without optional name", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "a@b.com" });
    assert.equal(res.status, 201);
    assert.equal(res.body.data.email, "a@b.com");
    // name should not be present when not provided
    assert.equal(res.body.data.name, undefined);
  });

  it("should reject request with invalid email", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" });
    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  it("should reject request with missing email", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "No Email" });
    assert.equal(res.status, 400);
  });

  it("should reject non-object JSON body (array)", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send(["a", "b", "c"]);
    assert.equal(res.status, 400);
  });

  it("should reject non-object JSON body (string)", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send("hello");
    assert.equal(res.status, 400);
  });

  it("should reject non-object JSON body (null)", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send(null);
    assert.equal(res.status, 400);
  });

  it("should reject empty body", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send("");
    assert.equal(res.status, 400);
  });

  it("should ignore client-controlled id", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "user@test.com", id: "client-id-123" });
    assert.equal(res.status, 201);
    assert.notEqual(res.body.data.id, "client-id-123");
    assert.ok(res.body.data.id);
    assert.ok(res.body.data.id.length > 0);
  });

  it("should ignore extra unrelated fields", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        role: "admin",
        password: "secret123",
        extraField: true,
      });
    assert.equal(res.status, 201);
    const keys = Object.keys(res.body.data);
    assert.ok(keys.includes("id"));
    assert.ok(keys.includes("email"));
    assert.ok(!keys.includes("role"));
    assert.ok(!keys.includes("password"));
    assert.ok(!keys.includes("extraField"));
  });

  it("should normalize email to lowercase (with whitespace)", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "  USER@EXAMPLE.COM  " });
    assert.equal(res.status, 201);
    assert.equal(res.body.data.email, "user@example.com");
  });
});
