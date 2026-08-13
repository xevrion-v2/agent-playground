import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /users", () => {
  it("should return 200 and a list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return a message indicating it is not yet implemented', async () => {
    const res = await request(app).get("/users");
    expect(res.body.message).toContain("not implemented");
  });
});

describe("POST /users", () => {
  it("should return 201 and create a user stub", async () => {
    const newUser = { name: "Alice", email: "alice@example.com" };
    const res = await request(app)
      .post("/users")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", "Alice");
    expect(res.body.data).toHaveProperty("email", "alice@example.com");
    expect(res.body).toHaveProperty("message");
  });

  it("should echo back extra fields from the request body", async () => {
    const newUser = { name: "Bob", email: "bob@test.com", role: "admin" };
    const res = await request(app)
      .post("/users")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Bob");
    expect(res.body.data.email).toBe("bob@test.com");
    expect(res.body.data.role).toBe("admin");
  });

  it('should return a message indicating creation is not yet implemented', async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Test", email: "test@test.com" })
      .set("Content-Type", "application/json");

    expect(res.body.message).toContain("not implemented");
  });

  it("should handle empty request body gracefully", async () => {
    const res = await request(app)
      .post("/users")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
  });
});

describe("GET /health", () => {
  it("should return 200 with service status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("service", "taskflow-api");
  });
});
