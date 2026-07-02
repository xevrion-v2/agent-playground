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

afterAll(() => server.close());

describe("GET /users", () => {
  it("returns 200 with consistent envelope", async () => {
    const res = await request(app).get("/users").expect(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("returns message for not-implemented", async () => {
    const res = await request(app).get("/users");
    expect(res.body.message).toContain("not implemented");
  });
});

describe("GET /users/:id", () => {
  it("returns 404 for unknown user", async () => {
    const res = await request(app).get("/users/unknown").expect(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /users", () => {
  it("returns 201 with valid body and envelope", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" })
      .expect(201);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body.data).toHaveProperty("id");
  });

  it("returns 400 when body is empty", async () => {
    const res = await request(app).post("/users").send({}).expect(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" })
      .expect(400);
    expect(res.body.error).toContain("name");
  });

  it("returns 400 when email is invalid format", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "bad-email" })
      .expect(400);
    expect(res.body.error).toContain("email");
  });
});

describe("PUT /users/:id", () => {
  it("returns 501 not implemented", async () => {
    const res = await request(app).put("/users/1").send({}).expect(501);
    expect(res.body).toHaveProperty("error");
  });
});

describe("DELETE /users/:id", () => {
  it("returns 501 not implemented", async () => {
    const res = await request(app).delete("/users/1").expect(501);
    expect(res.body).toHaveProperty("error");
  });
});

describe("Body size limit", () => {
  it("rejects oversized payload", async () => {
    const big = { name: "A", email: "a@b.com", junk: "x".repeat(102400) };
    const res = await request(app).post("/users").send(big);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
