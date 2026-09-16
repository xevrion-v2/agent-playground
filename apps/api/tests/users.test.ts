import request from "supertest";
import { app } from "../../src/index";
import { describe, it, expect } from "vitest";

describe("POST /users", () => {
  it("should reject non-object JSON bodies", async () => {
    const res = await request(app).post("/users").send("not an object");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid request body");
  });

  it("should require a valid email", async () => {
    const res = await request(app).post("/users").send({ firstName: "John" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid request body");
    expect(res.body.issues[0].path[0]).toBe("email");
  });

  it("should normalize email and name values", async () => {
    const res = await request(app)
    .post("/users")
    .send({ email: "  john@example.com  ", firstName: "  John  " });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("john@example.com");
    expect(res.body.data.firstName).toBe("John");
  });

  it("should ignore client-controlled id and unrelated fields", async () => {
    const res = await request(app)
    .post("/users")
    .send({ email: "john@example.com", id: "client-id", extra: "field" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("client-id");
    expect(res.body.data).not.toHaveProperty("extra");
  });
});