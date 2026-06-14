import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import usersRouter from "../../apps/api/src/routes/users";

describe("Users Router", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", usersRouter);
  });

  describe("GET /users", () => {
    it("should return empty list with message", async () => {
      const response = await fetch("http://localhost:4000/users");
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toEqual([]);
      expect(data.message).toBe("User listing is not implemented yet.");
    });
  });

  describe("POST /users", () => {
    it("should return 400 when username is missing", async () => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.messages).toContain("username is required");
    });

    it("should return 400 when email is missing", async () => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser" }),
      });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.messages).toContain("email is required");
    });

    it("should return 400 when username is too short", async () => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "ab", email: "test@example.com" }),
      });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.messages).toContain("username must be between 3 and 30 characters");
    });

    it("should return 400 when email is invalid", async () => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser", email: "invalid" }),
      });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.messages).toContain("email must be a valid email address");
    });

    it("should return 201 with valid input", async () => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser", email: "test@example.com" }),
      });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.data.id).toBe("stub-user-id");
      expect(data.data.username).toBe("testuser");
      expect(data.data.email).toBe("test@example.com");
      expect(data.message).toBe("User creation is not implemented yet.");
    });
  });
});
