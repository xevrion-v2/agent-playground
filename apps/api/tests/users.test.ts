import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import usersRouter from "../src/routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return an empty data array with message", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
      expect(res.body.message).toBe("User listing is not implemented yet.");
    });
  });

  describe("POST /users", () => {
    it("should create a stub user and return 201", async () => {
      const payload = { name: "Alice", email: "alice@example.com" };
      const res = await request(app).post("/users").send(payload);
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
      expect(res.body.data.name).toBe("Alice");
      expect(res.body.data.email).toBe("alice@example.com");
      expect(res.body.message).toBe("User creation is not implemented yet.");
    });

    it("should accept an empty body", async () => {
      const res = await request(app).post("/users").send({});
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id", "stub-user-id");
    });
  });
});
