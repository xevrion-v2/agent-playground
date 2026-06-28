import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users.js";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  let app: ReturnType<typeof buildApp>;

  beforeAll(() => {
    app = buildApp();
  });

  it("returns 200 with an empty data array", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("returns a message field", async () => {
    const res = await request(app).get("/users");
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});

describe("POST /users", () => {
  let app: ReturnType<typeof buildApp>;

  beforeAll(() => {
    app = buildApp();
  });

  it("returns 201 with a data object", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(typeof res.body.data).toBe("object");
  });

  it("returns a message field", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Bob" });
    expect(res.body).toHaveProperty("message");
  });

  it("reflects body fields in the stub response", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Carol", role: "user" });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ name: "Carol" });
  });
});
