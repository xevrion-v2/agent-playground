import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter, { parseCreateUserPayload } from "../routes/users";

/* ------------------------------------------------------------------ */
/*  Unit tests - parseCreateUserPayload                                */
/* ------------------------------------------------------------------ */

describe("parseCreateUserPayload", () => {
  it("rejects null", () => {
    const r = parseCreateUserPayload(null);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(400);
  });

  it("rejects undefined", () => {
    const r = parseCreateUserPayload(undefined);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(400);
  });

  it("rejects arrays", () => {
    const r = parseCreateUserPayload([]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(400);
  });

  it("rejects string", () => {
    const r = parseCreateUserPayload("hello");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(400);
  });

  it("rejects missing email", () => {
    const r = parseCreateUserPayload({ name: "Alice" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toMatch(/email/i);
  });

  it("rejects invalid email (no @)", () => {
    const r = parseCreateUserPayload({ email: "notanemail" });
    expect(r.ok).toBe(false);
  });

  it("rejects invalid email (no domain)", () => {
    const r = parseCreateUserPayload({ email: "a@b" });
    expect(r.ok).toBe(false);
  });

  it("rejects email that is not a string", () => {
    const r = parseCreateUserPayload({ email: 12345 });
    expect(r.ok).toBe(false);
  });

  it("rejects name that is not a string", () => {
    const r = parseCreateUserPayload({ email: "a@b.com", name: 999 });
    expect(r.ok).toBe(false);
  });

  it("accepts valid email and normalises it", () => {
    const r = parseCreateUserPayload({ email: "  Alice@Example.COM " });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBe("alice@example.com");
      expect(r.value.name).toBe("");
    }
  });

  it("accepts valid email with name and normalises both", () => {
    const r = parseCreateUserPayload({ email: "Bob@Test.Org", name: "  Bob  " });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBe("bob@test.org");
      expect(r.value.name).toBe("Bob");
    }
  });

  it("ignores extra fields (id, role, etc.)", () => {
    const r = parseCreateUserPayload({
      id: "attacker-id",
      email: "  Eve@Evil.COM ",
      name: "  Eve  ",
      role: "admin",
      extra: true,
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.email).toBe("eve@evil.com");
      expect(r.value.name).toBe("Eve");
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Integration tests - POST /users                                    */
/* ------------------------------------------------------------------ */

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("POST /users", () => {
  it("returns 400 for non-object body (array)", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send([1, 2, 3])
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("returns 400 for empty object", async () => {
    const res = await request(makeApp()).post("/users").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send({ email: "bademail" });
    expect(res.status).toBe(400);
  });

  it("returns 201 with server-generated id for valid payload", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send({ email: "test@example.com", name: "Tester" });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    // id must be a UUID v4 (36-char hex-dashed)
    expect(res.body.data.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(res.body.data.email).toBe("test@example.com");
    expect(res.body.data.name).toBe("Tester");
    expect(res.body.message).toBe("User created successfully.");
  });

  it("ignores client-supplied id", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send({ id: "hijacked-id", email: "user@test.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("hijacked-id");
  });

  it("ignores extraneous fields", async () => {
    const res = await request(makeApp())
      .post("/users")
      .send({ email: "extra@test.com", role: "admin", token: "abc" });
    expect(res.status).toBe(201);
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.token).toBeUndefined();
  });
});
