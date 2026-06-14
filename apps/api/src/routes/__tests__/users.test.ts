import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../users.js";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("User routes", () => {
  describe("GET /users", () => {
    it("returns an empty data array with a message", async () => {
      const res = await request(createApp()).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /users", () => {
    it("returns 201 with stub user data", async () => {
      const payload = { name: "Alice", email: "alice@example.com" };
      const res = await request(createApp())
        .post("/users")
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data.name).toBe("Alice");
      expect(res.body.data.email).toBe("alice@example.com");
      expect(res.body).toHaveProperty("message");
    });

    it("merges request body fields into the response", async () => {
      const payload = { role: "admin" };
      const res = await request(createApp())
        .post("/users")
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.role).toBe("admin");
    });
  });
});
