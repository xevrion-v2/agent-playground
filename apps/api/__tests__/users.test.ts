import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../src/routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users", () => {
  it("should reject request with custom id field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ id: "abc-123", email: "test@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.details).toContain("id is generated server-side and must not be provided");
  });

  it("should reject request with extra fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", role: "admin" });

    expect(res.status).toBe(400);
    expect(res.body.details[0]).toContain("Unexpected fields");
  });

  it("should reject missing email", async () => {
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(400);
    expect(res.body.details[0]).toContain("email is required");
  });

  it("should reject invalid email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.details[0]).toContain("valid email");
  });

  it("should reject non-object body", async () => {
    const res = await request(app)
      .post("/users")
      .send("just a string");

    expect(res.status).toBe(400);
  });

  it("should create user with valid payload", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "User@Example.COM", name: "  john   DOE  " });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.email).toBe("user@example.com");
    expect(res.body.data.name).toBe("John Doe");
    expect(res.body.data).not.toHaveProperty("password");
  });

  it("should generate server-side id", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(typeof res.body.data.id).toBe("string");
    // UUID format
    expect(res.body.data.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });
});
