import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users.js";

function newApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("POST /users", () => {
  // Reject non-object bodies.

  it("rejects a JSON array", async () => {
    const res = await request(newApp())
      .post("/users")
      .send([1, 2, 3])
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON string body", async () => {
    const res = await request(newApp())
      .post("/users")
      .send('"hello"')
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON null body", async () => {
    const res = await request(newApp())
      .post("/users")
      .send(null)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON number body", async () => {
    const res = await request(newApp())
      .post("/users")
      .send(42)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects an empty body", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  // Require a valid email.

  it("rejects body without email", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ name: "Alice" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error.toLowerCase()).toContain("email");
  });

  it("rejects empty-string email", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects invalid email format", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "not-an-email" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects non-string email", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: 12345 })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  // Normalise email and name.

  it("normalises email to lowercase and trimmed", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "  Alice@Example.COM  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("normalises name by trimming whitespace", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "bob@example.com", name: "  Bob  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Bob");
  });

  it("allows missing name (optional field)", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "carol@example.com" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBeNull();
  });

  it("converts whitespace-only name to null", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "dave@example.com", name: "   " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBeNull();
  });

  it("rejects non-string name", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "eve@example.com", name: 123 })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  // Ignore client-controlled id and unrelated fields.

  it("ignores a client-supplied id", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ id: "hacked-id", email: "frank@example.com" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("hacked-id");
    expect(typeof res.body.data.id).toBe("string");
    expect(res.body.data.id.length).toBeGreaterThan(0);
  });

  it("strips unrelated extra fields", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({
        email: "grace@example.com",
        role: "admin",
        isAdmin: true,
        password: "secret",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data).not.toHaveProperty("role");
    expect(res.body.data).not.toHaveProperty("isAdmin");
    expect(res.body.data).not.toHaveProperty("password");
  });

  // Happy path.

  it("creates a user with valid payload", async () => {
    const res = await request(newApp())
      .post("/users")
      .send({ email: "henry@example.com", name: "Henry" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      email: "henry@example.com",
      name: "Henry",
    });
    expect(typeof res.body.data.id).toBe("string");
    expect(res.body.data.id.length).toBeGreaterThan(0);
    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("updatedAt");
  });
});
