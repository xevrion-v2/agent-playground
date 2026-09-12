import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("returns 200 with a stub listing", async () => {
    const app = buildApp();
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/not implemented/i);
  });
});

describe("POST /users", () => {
  it("returns 201 with the created user stub", async () => {
    const app = buildApp();
    const newUser = { name: "Jane Doe", email: "jane@example.com" };

    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("name", "Jane Doe");
    expect(res.body.data).toHaveProperty("email", "jane@example.com");
    expect(res.body.message).toMatch(/not implemented/i);
  });

  it("returns 400 when name is missing", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "jane@example.com" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e: any) => e.path === "name")).toBe(true);
  });

  it("returns 400 when name is an empty string", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "", email: "jane@example.com" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.some((e: any) => e.path === "name")).toBe(true);
  });

  it("returns 400 when email is invalid", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Jane Doe", email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.some((e: any) => e.path === "email")).toBe(true);
  });

  it("returns 400 when email is missing", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Jane Doe" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.some((e: any) => e.path === "email")).toBe(true);
  });

  it("returns 400 when both name and email are missing", async () => {
    const app = buildApp();
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.some((e: any) => e.path === "name")).toBe(true);
    expect(res.body.errors.some((e: any) => e.path === "email")).toBe(true);
  });

  // --- Additional regression tests for #2207 ---

  it("rejects non-object JSON bodies", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send("just a string")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.errors.some((e: any) => e.path === "body")).toBe(true);
  });

  it("normalizes name with surrounding whitespace", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "  Jane Doe  ", email: "jane@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Jane Doe");
  });

  it("normalizes email with surrounding whitespace", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({ name: "Jane Doe", email: "  jane@example.com  " });

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("jane@example.com");
  });

  it("ignores client-supplied id and extra fields", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/users")
      .send({
        id: "hacker-id",
        name: "Jane Doe",
        email: "jane@example.com",
        role: "admin",
        extra: "should be ignored"
      });

    expect(res.status).toBe(201);
    // Server-generated id, not the client-supplied one
    expect(res.body.data.id).toBe("stub-user-id");
    // Only name and email should appear
    expect(res.body.data).not.toHaveProperty("role");
    expect(res.body.data).not.toHaveProperty("extra");
  });
});
