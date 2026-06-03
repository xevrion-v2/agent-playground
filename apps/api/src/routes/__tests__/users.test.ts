import request from "supertest";
import express from "express";
import usersRouter from "../users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("should return empty user list", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.message).toBe("User listing is not implemented yet.");
  });
});

describe("POST /users", () => {
  it("should create user with valid input", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com"
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      id: "stub-user-id",
      name: "John Doe",
      email: "john@example.com"
    });
  });

  it("should reject missing name", async () => {
    const res = await request(app).post("/users").send({
      email: "john@example.com"
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });

  it("should reject invalid email", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "not-an-email"
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });
});
