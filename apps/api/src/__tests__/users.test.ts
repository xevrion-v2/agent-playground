import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../routes/users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("GET /users", () => {
  it("should return 200 with an empty data array", async () => {
    const app = createApp();
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.message).toContain("not implemented");
  });
});

describe("POST /users", () => {
  it("should return 201 with stub user data", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", name: "Test User" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
    expect(res.body.data.email).toBe("test@example.com");
    expect(res.body.data.name).toBe("Test User");
    expect(res.body.message).toContain("not implemented");
  });

  it("should echo back request body fields", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/users")
      .send({ email: "hello@world.com", role: "admin" });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("hello@world.com");
    expect(res.body.data.role).toBe("admin");
  });

  it("should return stub-user-id for all creations", async () => {
    const app = createApp();
    const res1 = await request(app).post("/users").send({ email: "a@b.com" });
    const res2 = await request(app).post("/users").send({ email: "c@d.com" });
    expect(res1.body.data.id).toBe("stub-user-id");
    expect(res2.body.data.id).toBe("stub-user-id");
  });
});
