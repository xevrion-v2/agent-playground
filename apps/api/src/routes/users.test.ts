import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns empty user list with status 200", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "User listing is not implemented yet.",
    });
  });

  it("returns JSON content type", async () => {
    const app = createApp();
    const res = await request(app).get("/users");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});

describe("POST /users", () => {
  it("creates a user stub with valid email and returns 201", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "alice@example.com" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data.email).toBe("alice@example.com");
  });

  it("accepts optional name field", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "bob@example.com", name: "Bob" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Bob");
  });

  it("returns 400 when email is missing", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Validation failed");
  });

  it("returns 400 when email is an empty string", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("email");
  });

  it("returns 400 when email format is invalid", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "not-an-email" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("valid email");
  });

  it("returns 400 when body is not a JSON object", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send('"just a string"')
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });
});
