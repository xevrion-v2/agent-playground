import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("Users routes", () => {
  describe("GET /users", () => {
    it("should return a 200 status with an empty data array", async () => {
      const app = createApp();
      const res = await request(app).get("/users");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toEqual([]);
      expect(res.body).toHaveProperty("message");
    });

    it("should include a message about not being implemented", async () => {
      const app = createApp();
      const res = await request(app).get("/users");

      expect(res.body.message).toContain("not implemented");
    });
  });

  describe("POST /users", () => {
    it("should create a stub user and return 201", async () => {
      const app = createApp();
      const payload = { name: "Alice", email: "alice@example.com" };
      const res = await request(app).post("/users").send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject(payload);
      expect(res.body.data).toHaveProperty("id");
    });

    it("should assign a stub id when creating a user", async () => {
      const app = createApp();
      const res = await request(app)
        .post("/users")
        .send({ name: "Bob" });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
    });
  });
});
