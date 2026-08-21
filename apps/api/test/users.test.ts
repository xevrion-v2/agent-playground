import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import { Server } from "http";
import request from "supertest";
import usersRouter from "../src/routes/users";

let app: express.Express;
let server: Server;

beforeAll(() => {
  app = express();
  app.use(express.json({ limit: "100kb" }));
  app.use("/users", usersRouter);
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});

describe("GET /users", () => {
  it("returns 200 with data array", async () => {
    const res = await request(app).get("/users").expect(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("returns message about not implemented", async () => {
    const res = await request(app).get("/users");
    expect(res.body.message).toContain("not implemented");
  });
});

describe("POST /users", () => {
  it("returns 201 with valid body", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" })
      .expect(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Alice");
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("returns 400 when body is missing (empty request)", async () => {
    const res = await request(app)
      .post("/users")
      .send({})
      .expect(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" })
      .expect(400);
    expect(res.body.error).toContain("name");
  });

  it("returns 400 when email is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice" })
      .expect(400);
    expect(res.body.error).toContain("email");
  });

  it("returns 400 when name is empty string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "", email: "alice@example.com" })
      .expect(400);
    expect(res.body.error).toContain("name");
  });

  it("returns 400 when email is invalid format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "not-an-email" })
      .expect(400);
    expect(res.body.error).toContain("email");
  });

  it("returns 400 when email is empty string", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "" })
      .expect(400);
    expect(res.body.error).toContain("email");
  });
});

describe("Body size limit", () => {
  it("rejects body over 100kb", async () => {
    const largeBody = { name: "Alice", email: "alice@example.com", junk: "x".repeat(102400) };
    const res = await request(app)
      .post("/users")
      .send(largeBody);
    // Express returns 413 Payload Too Large or 400 for oversized JSON
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
