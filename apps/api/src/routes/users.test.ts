import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import usersRouter from "./users.js";

describe("POST /users - User Creation Validation", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", usersRouter);
  });

  describe("Acceptance Criteria 1: Reject non-object JSON bodies", () => {
    it("should reject array body", async () => {
      const response = await request(app).post("/users").send([1, 2, 3]);
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/must be a JSON object/i);
    });

    it("should reject empty body", async () => {
      const response = await request(app).post("/users").send();
      expect(response.status).toBe(400);
    });
  });

  describe("Acceptance Criteria 2: Require a valid email", () => {
    it("should reject missing email", async () => {
      const response = await request(app).post("/users").send({ name: "John" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/email is required/i);
    });

    it("should reject empty email", async () => {
      const response = await request(app).post("/users").send({ email: "" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/invalid email/i);
    });

    it("should reject invalid email format (no @)", async () => {
      const response = await request(app).post("/users").send({ email: "notanemail" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/invalid email/i);
    });

    it("should reject invalid email format (no domain)", async () => {
      const response = await request(app).post("/users").send({ email: "user@" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/invalid email/i);
    });

    it("should reject invalid email format (no TLD)", async () => {
      const response = await request(app).post("/users").send({ email: "user@domain" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/invalid email/i);
    });

    it("should reject email with spaces", async () => {
      const response = await request(app).post("/users").send({ email: "user @domain.com" });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/invalid email/i);
    });

    it("should accept valid email", async () => {
      const response = await request(app).post("/users").send({ email: "user@example.com" });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@example.com");
    });
  });

  describe("Acceptance Criteria 3: Normalize email/name values", () => {
    it("should normalize email to lowercase", async () => {
      const response = await request(app).post("/users").send({ email: "User@EXAMPLE.COM" });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@example.com");
    });

    it("should trim email whitespace", async () => {
      const response = await request(app).post("/users").send({ email: "  user@example.com  " });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@example.com");
    });

    it("should trim name whitespace", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "  John Doe  ",
      });
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe("John Doe");
    });

    it("should omit empty name after trimming", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "   ",
      });
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBeUndefined();
    });
  });

  describe("Acceptance Criteria 4: Ignore client-controlled id and unrelated fields", () => {
    it("should ignore client-provided id", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        id: "client-controlled-id",
      });
      expect(response.status).toBe(201);
      expect(response.body.data.id).not.toBe("client-controlled-id");
      expect(response.body.data.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it("should ignore unrelated fields", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "John",
        role: "admin",
        isAdmin: true,
        creditLimit: 999999,
        malicious: "data",
      });
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).not.toHaveProperty("role");
      expect(response.body.data).not.toHaveProperty("isAdmin");
      expect(response.body.data).not.toHaveProperty("creditLimit");
      expect(response.body.data).not.toHaveProperty("malicious");
    });

    it("should generate server-side UUID v4", async () => {
      const response = await request(app).post("/users").send({ email: "user@example.com" });
      expect(response.status).toBe(201);
      const id = response.body.data.id;
      // UUID v4 format check
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });

  describe("Acceptance Criteria 5: Regression tests", () => {
    it("should create user with only email (name is optional)", async () => {
      const response = await request(app).post("/users").send({ email: "user@example.com" });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@example.com");
      expect(response.body.data.id).toBeDefined();
    });

    it("should create user with email and name", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "John Doe",
      });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@example.com");
      expect(response.body.data.name).toBe("John Doe");
      expect(response.body.data.id).toBeDefined();
    });

    it("should reject non-string email", async () => {
      const response = await request(app).post("/users").send({ email: 123 });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/email is required/i);
    });

    it("should reject non-string name", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: 123,
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/name must be a string/i);
    });

    it("should return 201 status on successful creation", async () => {
      const response = await request(app).post("/users").send({ email: "user@example.com" });
      expect(response.status).toBe(201);
    });

    it("should return success message on creation", async () => {
      const response = await request(app).post("/users").send({ email: "user@example.com" });
      expect(response.body.message).toMatch(/created successfully/i);
    });

    it("should generate unique IDs for different users", async () => {
      const response1 = await request(app).post("/users").send({ email: "user1@example.com" });
      const response2 = await request(app).post("/users").send({ email: "user2@example.com" });
      expect(response1.body.data.id).not.toBe(response2.body.data.id);
    });
  });

  describe("Edge cases", () => {
    it("should handle email with subdomains", async () => {
      const response = await request(app).post("/users").send({ email: "user@mail.example.com" });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user@mail.example.com");
    });

    it("should handle email with plus addressing", async () => {
      const response = await request(app).post("/users").send({ email: "user+tag@example.com" });
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe("user+tag@example.com");
    });

    it("should handle name with special characters", async () => {
      const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "José García-López",
      });
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe("José García-López");
    });
  });
});
