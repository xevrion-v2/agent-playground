import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

/**
 * Build a minimal Express app that mounts the users router at /users
 * so we can test via supertest without starting the full API server.
 */
function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("should return 200 OK with a data array and message", async () => {
    const app = buildApp();
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(0);
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
    expect(res.body.message).toBe("User listing is not implemented yet.");
  });

  it("should not return nested errors or unexpected fields", async () => {
    const app = buildApp();
    const res = await request(app).get("/users");

    expect(res.body).not.toHaveProperty("error");
    expect(res.body).not.toHaveProperty("errors");
    expect(res.body).not.toHaveProperty("stack");
  });

  it("should set Content-Type application/json", async () => {
    const app = buildApp();
    const res = await request(app).get("/users");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});

describe("POST /users", () => {
  it("should return 201 Created with a stub user and message", async () => {
    const app = buildApp();
    const payload = { name: "Alice", email: "alice@example.com" };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toMatchObject(payload);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User creation is not implemented yet.");
  });

  it("should accept and echo back an empty request body", async () => {
    const app = buildApp();
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    // With an empty body, req.body is {} so spread yields an empty object
    expect(res.body.data).not.toHaveProperty("name");
    expect(res.body.data).not.toHaveProperty("email");
  });

  it("should echo back any additional fields sent in the body", async () => {
    const app = buildApp();
    const payload = {
      name: "Bob",
      email: "bob@example.com",
      role: "admin",
      age: 30,
      tags: ["dev", "ops"],
    };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toMatchObject(payload);
  });

  it("should not return errors for unexpected fields", async () => {
    const app = buildApp();
    const payload = { someUnknownField: "should-be-allowed" };
    const res = await request(app).post("/users").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
    expect(res.body.data).toHaveProperty("someUnknownField", "should-be-allowed");
    expect(res.body).not.toHaveProperty("error");
    expect(res.body).not.toHaveProperty("errors");
  });

  it("should set Content-Type application/json on response", async () => {
    const app = buildApp();
    const res = await request(app).post("/users").send({ name: "Test" });

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should handle request with no body gracefully", async () => {
    const app = buildApp();
    // Send without explicitly setting a body
    const res = await request(app).post("/users");

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id", "stub-user-id");
  });
});

describe("unknown methods on /users", () => {
  it("should return 404 for PUT /users", async () => {
    const app = buildApp();
    const res = await request(app).put("/users");

    expect(res.status).toBe(404);
  });

  it("should return 404 for DELETE /users", async () => {
    const app = buildApp();
    const res = await request(app).delete("/users");

    expect(res.status).toBe(404);
  });

  it("should return 404 for PATCH /users", async () => {
    const app = buildApp();
    const res = await request(app).patch("/users");

    expect(res.status).toBe(404);
  });
});
