import request from "supertest";
import { app } from "../index.js";

describe("GET /users", () => {
  it("should return 200 with a data array", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe("POST /users", () => {
  const validUser = { name: "Alice", email: "alice@example.com" };

  it("should return 201 with valid body", async () => {
    const res = await request(app).post("/users").send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
    expect(res.body.data.name).toBe("Alice");
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("should return 400 when name is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(app).post("/users").send({ name: "Alice" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it("should return 400 when name is empty string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "", email: "alice@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it("should return 400 when email is empty string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it("should return 400 for invalid email format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it("should return 400 when body is an array", async () => {
    const res = await request(app)
      .post("/users")
      .send([{ name: "Alice", email: "alice@example.com" }]);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/JSON object/i);
  });

  it("should return 400 when body is null", async () => {
    const res = await request(app)
      .post("/users")
      .type("json")
      .send(JSON.stringify(null));
    // Express JSON parser (strict mode) rejects literal null with 400
    expect(res.status).toBe(400);
  });

  it("should return 413 when body exceeds size limit", async () => {
    // Send valid JSON whose value exceeds 100 KB
    const largeName = "x".repeat(101 * 1024);
    const payload = JSON.stringify({ name: largeName, email: "test@example.com" });
    const res = await request(app)
      .post("/users")
      .type("json")
      .send(payload);
    expect(res.status).toBe(413);
  });
});
