import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users - User Creation Validation", () => {
  // Criterion 1: Reject non-object JSON bodies
  it("should reject non-object JSON (array)", async () => {
    const res = await request(app)
      .post("/users")
      .send(["email@example.com"]);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/object/);
  });

  it("should reject null body", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(null);
    expect(res.status).toBe(400);
  });

  it("should reject non-object primitives", async () => {
    const res = await request(app)
      .post("/users")
      .send("string");
    expect(res.status).toBe(400);
  });

  // Criterion 2: Require valid email
  it("should reject missing email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John Doe" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/);
  });

  it("should reject invalid email format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email", name: "John" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/valid email/);
  });

  it("should reject empty email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "", name: "John" });
    expect(res.status).toBe(400);
  });

  // Criterion 3: Normalize email and name
  it("should normalize email (lowercase and trim)", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  JOHN@EXAMPLE.COM  " });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("john@example.com");
  });

  it("should normalize name (trim and collapse whitespace)", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "john@example.com", name: "  John   Doe  " });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("John Doe");
  });

  it("should handle missing name gracefully", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "john@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("john@example.com");
    expect(res.body.data.name).toBeUndefined();
  });

  // Criterion 4: Ignore client-controlled id and unrelated fields
  it("should ignore client-provided id", async () => {
    const res = await request(app)
      .post("/users")
      .send({ id: "custom-id", email: "john@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("custom-id");
    expect(res.body.data.id).toMatch(/^user-/);
  });

  it("should ignore unrelated fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "john@example.com",
        name: "John",
        admin: true,
        role: "superuser",
        password: "secret123"
      });
    expect(res.status).toBe(201);
    expect(res.body.data.admin).toBeUndefined();
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.password).toBeUndefined();
  });

  // Valid case
  it("should create user with valid email and name", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "john@example.com", name: "John Doe" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("john@example.com");
    expect(res.body.data.name).toBe("John Doe");
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.id).not.toMatch(/stub/);
  });

  it("should create user with valid email only", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "jane@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("jane@example.com");
    expect(res.body.data.id).toBeDefined();
  });
});
