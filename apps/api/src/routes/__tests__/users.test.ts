import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User routes", () => {
  describe("GET /users", () => {
    it("returns 200 with data array and message", async () => {
      const res = await request(app).get("/users");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty("message");
    });

    it("returns an empty data array", async () => {
      const res = await request(app).get("/users");

      expect(res.body.data).toEqual([]);
    });
  });

  describe("POST /users", () => {
    it("returns 201 with created user stub", async () => {
      const payload = { name: "Alice", email: "alice@example.com" };
      const res = await request(app).post("/users").send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data).toHaveProperty("name", "Alice");
      expect(res.body.data).toHaveProperty("email", "alice@example.com");
      expect(res.body).toHaveProperty("message");
    });

    it("merges request body into response data", async () => {
      const payload = { role: "admin" };
      const res = await request(app).post("/users").send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        id: "stub-user-id",
        role: "admin",
      });
    });
  });
});
