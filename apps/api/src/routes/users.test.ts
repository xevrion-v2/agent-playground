import request from "supertest";
import express from "express";
import usersRouter from "./users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("User Routes", () => {
  describe("GET /users", () => {
    it("should return empty user list with message", async () => {
      const response = await request(app)
        .get("/users")
        .expect(200);
      
      expect(response.body).toEqual({
        data: [],
        message: "User listing is not implemented yet.",
      });
    });

    it("should return array in data field", async () => {
      const response = await request(app)
        .get("/users")
        .expect(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("POST /users", () => {
    it("should reject non-object JSON bodies", async () => {
      const response = await request(app)
        .post("/users")
        .send("not an object")
        .expect(400);
      expect(response.body.error).toBe("Invalid request body: must be a JSON object");
    });

    it("should reject array bodies", async () => {
      const response = await request(app)
        .post("/users")
        .send([])
        .expect(400);
      expect(response.body.error).toBe("Invalid request body: must be a JSON object");
    });

    it("should reject null bodies", async () => {
      const response = await request(app)
        .post("/users")
        .send(null)
        .expect(400);
      expect(response.body.error).toBe("Invalid request body: must be a JSON object");
    });

    it("should require a valid email", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "invalid-email" })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details.email).toContain("Invalid email format");
    });

    it("should reject missing email", async () => {
      const response = await request(app)
        .post("/users")
        .send({ name: "John" })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details.email).toBeDefined();
    });

    it("should reject empty email", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "" })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should normalize email to lowercase and trim", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "  USER@EXAMPLE.COM  " })
        .expect(201);
      expect(response.body.data.email).toBe("user@example.com");
    });

    it("should normalize name by trimming", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "  John Doe  " })
        .expect(201);
      expect(response.body.data.name).toBe("John Doe");
    });

    it("should accept optional name", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com" })
        .expect(201);
      expect(response.body.data.name).toBeUndefined();
    });

    it("should reject empty name string", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "" })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should reject name longer than 100 characters", async () => {
      const longName = "a".repeat(101);
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: longName })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should ignore client-controlled id field", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", id: "hacker-id" })
        .expect(201);
      expect(response.body.data.id).not.toBe("hacker-id");
      expect(response.body.data.id).toMatch(/^user_\d+_[a-z0-9]+$/);
    });

    it("should reject extra/unrelated fields", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", hack: "injected", role: "admin" })
        .expect(400);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should return server-generated id and createdAt", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com" })
        .expect(201);
      expect(response.body.data.id).toMatch(/^user_\d+_[a-z0-9]+$/);
      expect(response.body.data.createdAt).toBeDefined();
      expect(new Date(response.body.data.createdAt).toString()).not.toBe("Invalid Date");
    });

    it("should return 201 status on success", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com" })
        .expect(201);
      expect(response.body.message).toBe("User created successfully");
    });

    it("should return correct response structure", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "Test User" })
        .expect(201);
      
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("message");
    });
  });
});