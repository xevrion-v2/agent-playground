import request from "supertest";
import express from "express";
import usersRouter from "./users";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

describe("POST /users", () => {
  describe("valid requests", () => {
    it("creates a user with email only", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "alice@example.com" });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.email).toBe("alice@example.com");
      expect(res.body.data.name).toBeUndefined();
      expect(res.body.message).toBe("User created.");
    });

    it("creates a user with email and name", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "bob@example.com", name: "Bob Smith" });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe("bob@example.com");
      expect(res.body.data.name).toBe("Bob Smith");
    });

    it("generates a unique id per request", async () => {
      const app = buildApp();
      const res1 = await request(app)
        .post("/users")
        .send({ email: "a@b.com" });
      const res2 = await request(app)
        .post("/users")
        .send({ email: "c@d.com" });

      expect(res1.body.data.id).not.toBe(res2.body.data.id);
    });
  });

  describe("email normalization", () => {
    it("lowercases the email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "Alice@Example.COM" });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe("alice@example.com");
    });

    it("trims whitespace from the email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "  alice@example.com  " });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe("alice@example.com");
    });
  });

  describe("name normalization", () => {
    it("trims the name", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "a@b.com", name: "  Bob  " });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Bob");
    });

    it("strips control characters from the name", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "a@b.com", name: "\x00Bo\x1fl\x7f" });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Bol");
    });

    it("omits name when not provided", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "a@b.com" });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBeUndefined();
    });
  });

  describe("ignoring client-controlled fields", () => {
    it("ignores a client-supplied id", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "a@b.com", id: "hacked-id" });

      expect(res.status).toBe(201);
      expect(res.body.data.id).not.toBe("hacked-id");
    });

    it("ignores unrelated fields", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({
          email: "a@b.com",
          role: "admin",
          isAdmin: true,
          __proto__: { evil: true }
        });

      expect(res.status).toBe(201);
      expect(res.body.data.role).toBeUndefined();
      expect(res.body.data.isAdmin).toBeUndefined();
    });
  });

  describe("rejecting invalid bodies", () => {
    it("rejects a JSON array", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send(["not", "an", "object"]);

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects a JSON string", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send('"just a string"');

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects a JSON number", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send("42");

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects null body", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send(null);

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("email validation", () => {
    it("rejects missing email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ name: "No Email" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects empty email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects whitespace-only email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "   " });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects non-string email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: 12345 });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects malformed email", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "not-an-email" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("rejects email without domain", async () => {
      const app = buildApp();
      const res = await request(app)
        .post("/users")
        .send({ email: "user@nodomain" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });
});
