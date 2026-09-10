import { strict as assert } from "assert";
import { describe, it, before, after } from "node:test";
import express, { Express } from "express";
import request from "supertest";
import usersRouter from "./users";

let app: Express;

before(() => {
  app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
});

describe("POST /users", () => {
  it("should reject non-object JSON bodies", async () => {
    const res = await request(app)
      .post("/users")
      .send(["array", "instead", "of", "object"])
      .set("Content-Type", "application/json");

    assert.equal(res.status, 400);
    assert.match(res.body.error, /Expected a JSON object/);
  });

  it("should reject requests with missing email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John Doe" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 400);
    assert.match(res.body.error, /Email is required/);
  });

  it("should reject requests with invalid email format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email", name: "John Doe" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 400);
    assert.match(res.body.error, /Invalid email format/);
  });

  it("should accept valid email and generate server-side id", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@example.com", name: "John Doe" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(typeof res.body.data.id, "string");
    assert(res.body.data.id.length > 0);
    assert.equal(res.body.data.email, "user@example.com");
    assert.equal(res.body.data.name, "John Doe");
  });

  it("should normalize email to lowercase", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "User@EXAMPLE.COM" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(res.body.data.email, "user@example.com");
  });

  it("should trim email whitespace", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  user@example.com  " })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(res.body.data.email, "user@example.com");
  });

  it("should normalize name by trimming and collapsing whitespace", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@example.com", name: "  John   Doe  " })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(res.body.data.name, "John Doe");
  });

  it("should ignore client-provided id field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@example.com", id: "client-provided-id" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.notEqual(res.body.data.id, "client-provided-id");
    assert(res.body.data.id.length > 0);
  });

  it("should ignore unrelated extra fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "user@example.com",
        name: "John Doe",
        maliciousField: "should-be-ignored",
        customId: "also-ignored",
        role: "admin"
      })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(typeof res.body.data.maliciousField, "undefined");
    assert.equal(typeof res.body.data.customId, "undefined");
    assert.equal(typeof res.body.data.role, "undefined");
  });

  it("should accept optional name field (can be omitted)", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@example.com" })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 201);
    assert.equal(res.body.data.email, "user@example.com");
  });

  it("should reject null email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: null })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 400);
  });

  it("should reject non-string email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: 12345 })
      .set("Content-Type", "application/json");

    assert.equal(res.status, 400);
  });
});

describe("GET /users", () => {
  it("should return empty user list", async () => {
    const res = await request(app).get("/users");

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.data, []);
  });
});