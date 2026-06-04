import { describe, it, expect } from "vitest";

const BASE_URL = "http://localhost:4000";

describe("GET /users", () => {
  it("should return 200 with data array", async () => {
    const res = await fetch(`${BASE_URL}/users`);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(typeof body.message).toBe("string");
  });
});

describe("POST /users", () => {
  it("should return 201 with created user data", async () => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "test@example.com" }),
    });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.data).toHaveProperty("id");
    expect(body.data.name).toBe("Test");
  });

  it("should return 400 when name is missing", async () => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.errors).toBeDefined();
  });

  it("should return 400 when email is invalid", async () => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "not-an-email" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.errors).toBeDefined();
  });
});
