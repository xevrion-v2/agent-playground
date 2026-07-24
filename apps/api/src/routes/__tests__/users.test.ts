import request from "supertest";
import express from "express";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("POST /users - User Creation Validation", () => {
    it("should reject non-object JSON bodies", async () => {
        const res = await request(app)
            .post("/users")
            .send("not an object")
            .set("Content-Type", "application/json");
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("VALIDATION_ERROR");
    });

    it("should reject array bodies", async () => {
        const res = await request(app)
            .post("/users")
            .send([1, 2, 3]);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("VALIDATION_ERROR");
    });

    it("should require a valid email", async () => {
        const res = await request(app)
            .post("/users")
            .send({ name: "Test User" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("VALIDATION_ERROR");
        expect(res.body.message).toContain("Email is required");
    });

    it("should reject invalid email format", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "not-an-email" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("VALIDATION_ERROR");
        expect(res.body.message).toContain("valid email");
    });

    it("should normalize email to lowercase and trim", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "  Test@EXAMPLE.COM  " });
        expect(res.status).toBe(201);
        expect(res.body.data.email).toBe("test@example.com");
    });

    it("should generate server-side ID and ignore client-provided id", async () => {
        const res = await request(app)
            .post("/users")
            .send({ id: "custom-id-123", email: "test@example.com", extra: "field" });
        expect(res.status).toBe(201);
        expect(res.body.data.id).not.toBe("custom-id-123");
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.extra).toBeUndefined();
    });

    it("should normalize optional name - trim whitespace", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "test@example.com", name: "  John Doe  " });
        expect(res.status).toBe(201);
        expect(res.body.data.name).toBe("John Doe");
    });

    it("should omit name if empty string after trim", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "test@example.com", name: "   " });
        expect(res.status).toBe(201);
        expect(res.body.data.name).toBeUndefined();
    });

    it("should reject non-string name", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "test@example.com", name: 123 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("VALIDATION_ERROR");
    });

    it("should create user with valid email only (no name)", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: "user@example.com" });
        expect(res.status).toBe(201);
        expect(res.body.data.email).toBe("user@example.com");
        expect(res.body.data.name).toBeUndefined();
        expect(res.body.data.id).toBeDefined();
    });
});
