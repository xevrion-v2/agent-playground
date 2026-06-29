import request from "supertest";
import app from "../index";

describe("POST /users - User Creation Validation", () => {
  describe("Body Validation", () => {
    it("should reject non-object JSON body (string)", async () => {
      const res = await request(app)
        .post("/users")
        .send('"just a string"')
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should reject non-object JSON body (array)", async () => {
      const res = await request(app)
        .post("/users")
        .send('["email@test.com"]')
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should reject non-object JSON body (null)", async () => {
      const res = await request(app)
        .post("/users")
        .send("null")
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should reject non-object JSON body (number)", async () => {
      const res = await request(app)
        .post("/users")
        .send("42")
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("Email Validation", () => {
    it("should accept valid email", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.email).toBe("test@example.com");
    });

    it("should reject missing email", async () => {
      const res = await request(app).post("/users").send({ name: "John" });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.email).toBeDefined();
    });

    it("should reject invalid email format", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "not-an-email" });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.email).toBeDefined();
    });

    it("should reject numeric email", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: 12345 });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.email).toBeDefined();
    });

    it("should reject empty email", async () => {
      const res = await request(app).post("/users").send({ email: "" });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.email).toBeDefined();
    });
  });

  describe("Name Normalization", () => {
    it("should normalize name to lowercase", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "JOHN DOE" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe("john doe");
    });

    it("should trim name whitespace", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "  John Doe  " });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe("john doe");
    });

    it("should accept valid name with special characters", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "O'Brien-Smith" });
      expect(res.statusCode).toBe(201);
    });

    it("should reject invalid name with numbers", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "John123" });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.name).toBeDefined();
    });

    it("should reject invalid name with special characters", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: "John@#$%" });
      expect(res.statusCode).toBe(400);
      expect(res.body.details?.name).toBeDefined();
    });

    it("should handle null name", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", name: null });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBeNull();
    });

    it("should handle undefined name", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBeNull();
    });
  });

  describe("ID Generation & Sanitization", () => {
    it("should generate server-side UUID", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });

    it("should ignore client-provided id", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "test@example.com", id: "hacked-id-123" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.id).not.toBe("hacked-id-123");
      expect(res.body.data.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });

    it("should ignore unrelated fields", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          email: "test@example.com",
          name: "John Doe",
          admin: true,
          role: "superuser",
          extraField: "should be stripped",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.admin).toBeUndefined();
      expect(res.body.data.role).toBeUndefined();
      expect(res.body.data.extraField).toBeUndefined();
      expect(Object.keys(res.body.data)).toEqual(
        expect.arrayContaining(["id", "email", "name"])
      );
    });

    it("should normalize email to lowercase", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "TEST@EXAMPLE.COM" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.email).toBe("test@example.com");
    });

    it("should trim and lowercase email", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "  Test@Example.Com  " });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.email).toBe("test@example.com");
    });
  });

  describe("Happy Path", () => {
    it("should create user with valid data", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          email: "alice@example.com",
          name: "Alice Smith",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.email).toBe("alice@example.com");
      expect(res.body.data.name).toBe("alice smith");
      expect(res.body.message).toBe("User created successfully.");
    });

    it("should create user with email only", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "bob@example.com" });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.email).toBe("bob@example.com");
      expect(res.body.data.name).toBeNull();
    });
  });
});
