import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/index.js";

describe("POST /users", () => {
  it("rejects an array JSON body", async () => {
    const res = await request(app)
      .post("/users")
      .send([1, 2, 3]);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid request body — expected a JSON object.");
  });

  it("rejects requests without an email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Test User" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A valid email address is required.");
  });

  it("rejects invalid email format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A valid email address is required.");
  });

  it("creates a user with valid email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "Test@Example.COM" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("test@example.com");
    expect(res.body.data.id).toMatch(/^user-/);
  });

  it("normalizes email to lowercase", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "  USER@EXAMPLE.COM  " });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("user@example.com".toLowerCase().trim());
  });

  it("normalizes name whitespace", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "user@example.com", name: "  John   Doe  " });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("John Doe");
  });

  it("ignores client-controlled id and extra fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "user@example.com",
        id: "client-id-123",
        role: "admin",
        admin: true,
      });
    expect(res.status).toBe(201);
    // Server generates its own id
    expect(res.body.data.id).toMatch(/^user-/);
    expect(res.body.data.id).not.toBe("client-id-123");
    // Extra fields not in response
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.admin).toBeUndefined();
  });
});
