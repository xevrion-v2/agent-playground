import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users.js";

// ── Helper: spin up a minimal Express app per test suite ────────────
function app() {
  const a = express();
  a.use(express.json());
  a.use("/users", usersRouter);
  return a;
}

describe("POST /users", () => {
  // ── Acceptance criteria 1: Reject non-object JSON bodies ────────
  // Note: express.json() in strict mode (default) already rejects
  // primitives and null before the route handler runs.  We verify
  // the 400 status in each case.

  it("rejects a JSON array", async () => {
    const res = await request(app())
      .post("/users")
      .send([1, 2, 3])
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON string body", async () => {
    const res = await request(app())
      .post("/users")
      .send('"hello"')
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON null body", async () => {
    const res = await request(app())
      .post("/users")
      .send(null)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  it("rejects a JSON number body", async () => {
    const res = await request(app())
      .post("/users")
      .send(42)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  // ── Acceptance criteria 2: Require a valid email ────────────────
  it("rejects body without email", async () => {
    const res = await request(app())
      .post("/users")
      .send({ name: "Alice" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.toLowerCase()).toContain("email");
  });

  it("rejects empty-string email", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("rejects invalid email format", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "not-an-email" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // ── Acceptance criteria 3: Normalise email/name ─────────────────
  it("normalises email to lowercase and trimmed", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "  Alice@Example.COM  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("normalises name by trimming whitespace", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "bob@example.com", name: "  Bob  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Bob");
  });

  it("allows missing name (optional field)", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "carol@example.com" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBeNull();
  });

  // ── Acceptance criteria 4: Ignore client-controlled id & extras ─
  it("ignores a client-supplied id", async () => {
    const res = await request(app())
      .post("/users")
      .send({ id: "hacked-id", email: "dave@example.com" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("hacked-id");
    expect(typeof res.body.data.id).toBe("string");
    expect(res.body.data.id.length).toBeGreaterThan(0);
  });

  it("strips unrelated extra fields", async () => {
    const res = await request(app())
      .post("/users")
      .send({
        email: "eve@example.com",
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

  // ── Happy path ──────────────────────────────────────────────────
  it("creates a user with valid payload", async () => {
    const res = await request(app())
      .post("/users")
      .send({ email: "frank@example.com", name: "Frank" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      email: "frank@example.com",
      name: "Frank",
    });
    expect(typeof res.body.data.id).toBe("string");
    expect(res.body.data.id.length).toBeGreaterThan(0);
    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("updatedAt");
  });
});
