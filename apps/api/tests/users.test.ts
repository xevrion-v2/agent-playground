import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../src/routes/users";

function createApp() {
  const app = express();
  // strict: false allows JSON primitives so our route can validate them
  app.use(express.json({ strict: false }));
  app.use("/users", usersRouter);
  return app;
}

describe("POST /users — payload validation (#2207)", () => {
  const app = createApp();

  // ── Reject non-object bodies ────────────────────────────────────────

  it("rejects a null body", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send("null");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/expected a JSON object/i);
  });

  it("rejects an array body", async () => {
    const res = await request(app)
      .post("/users")
      .send(["a", "b"]);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/expected a JSON object/i);
  });

  it("rejects a string body", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send('"foobar"');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/expected a JSON object/i);
  });

  it("rejects a number body", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send("42");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/expected a JSON object/i);
  });

  // ── Require valid email ─────────────────────────────────────────────

  it("rejects missing email field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  it("rejects empty email string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  it("rejects email with only spaces", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "   " });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  it("rejects malformed email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  it("rejects email without domain", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  it("rejects email without tld", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@domain" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid.*email.*required/i);
  });

  // ── Normalize fields ────────────────────────────────────────────────

  it("normalizes email to lowercase and trims it", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  Alice@Example.COM  ", name: "  Alice  " });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("trims the name field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "bob@test.com", name: "  Bob Smith  " });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Bob Smith");
  });

  it("defaults name to empty string when absent", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "carol@test.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("");
  });

  // ── Strip client-controlled id and extra fields ─────────────────────

  it("ignores client-supplied id", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "dave@test.com", id: "evil-id-12345" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("evil-id-12345");
    expect(res.body.data.id).toMatch(/^user-/);
  });

  it("strips extra fields not in the schema", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "eve@test.com", role: "admin", password: "hunter2" });
    expect(res.status).toBe(201);
    expect(res.body.data).not.toHaveProperty("role");
    expect(res.body.data).not.toHaveProperty("password");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("id");
  });

  // ── Successful creation ─────────────────────────────────────────────

  it("creates a user successfully with minimal valid payload", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "frank@test.com" });
    expect(res.status).toBe(201);
    expect(res.body.data).toEqual({
      id: expect.stringMatching(/^user-/),
      email: "frank@test.com",
      name: "",
    });
    expect(res.body.message).toMatch(/created/i);
  });

  it("creates a user successfully with all fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "Grace@Test.com", name: " Grace Hopper " });
    expect(res.status).toBe(201);
    expect(res.body.data).toEqual({
      id: expect.stringMatching(/^user-/),
      email: "grace@test.com",
      name: "Grace Hopper",
    });
  });
});
