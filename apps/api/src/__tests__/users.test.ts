import { describe, it, expect } from "vitest";

describe("User Routes", () => {
  it("GET /users should return 200 with data array", async () => {
    const res = await fetch("/users");
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("POST /users should return 201 with created user", async () => {
    const res = await fetch("/users", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({name:"Test"}) });
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.data).toHaveProperty("id");
  });

  it("POST /users with no body should still return 201", async () => {
    const res = await fetch("/users", { method: "POST" });
    expect(res.status).toBe(201);
  });
});
