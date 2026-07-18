import request from "supertest";
import express from "express";
import usersRouter from "./users.js";

/** Minimal Express app wired identically to the real entry-point. */
function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

const app = buildApp();

// ---------------------------------------------------------------------------
// POST /users — regression tests
// ---------------------------------------------------------------------------

describe("POST /users", () => {
  // ── 1. VALID HAPPY PATH ──────────────────────────────────────────────────

  it("creates a user and returns a server-generated UUID id", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com", name: "Alice" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      email: "alice@example.com",
      name: "Alice"
    });
    // id must be a UUID produced by the server
    expect(res.body.data.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  // ── 2. STRUCTURE CHECK — root-level shape must be a JSON object ──────────

  it("returns 400 when the body is a JSON array", async () => {
    const res = await request(app)
      .post("/users")
      .send([])
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when the body is a non-empty JSON array", async () => {
    const res = await request(app)
      .post("/users")
      .send(["user1"])
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  // ── 3. EMAIL VALIDATION ──────────────────────────────────────────────────

  it("returns 400 when email is missing entirely", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "No Email" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when email is an empty string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when email has no @ symbol (e.g. 'dhruvpatil')", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "dhruvpatil" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when email is missing TLD (e.g. 'test@example')", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when email is a generic invalid string (e.g. 'not-an-email')", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  // ── 4. STRING NORMALIZATION ──────────────────────────────────────────────

  it("trims and lowercases the email (exact bounty payload: Dhruv@Example.Com)", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  Dhruv@Example.Com  ", name: "  Dhruv Patil  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("dhruv@example.com");
    expect(res.body.data.name).toBe("Dhruv Patil");
  });

  it("trims and lowercases a generic mixed-case email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  Hello@Example.COM  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("hello@example.com");
  });

  it("trims surrounding whitespace from name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "carol@example.com", name: "  Carol  " })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Carol");
  });

  // ── 5. FIELD STRIPPING & CLIENT ID REJECTION ─────────────────────────────

  it("ignores malicious-client-side-id-123 and strips hackyExtraField", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        id: "malicious-client-side-id-123",
        email: "dhruv@example.com",
        hackyExtraField: "dangerValue"
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);

    // Server must generate its own id — not the client-supplied one
    expect(res.body.data.id).not.toBe("malicious-client-side-id-123");
    expect(res.body.data.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    // Extra injected field must be completely absent
    expect(res.body.data).not.toHaveProperty("hackyExtraField");
  });

  it("ignores a generic client-supplied id and isAdmin extra field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "bob@example.com", id: "hacker-id", isAdmin: true })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("hacker-id");
    expect(res.body.data).not.toHaveProperty("isAdmin");
  });
});
