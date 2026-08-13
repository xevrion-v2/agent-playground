import request from "supertest";
import express from "express";
import usersRouter from "../src/routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("returns 200 with user list", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /users", () => {
  it("returns 201 with created user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Test User", email: "test@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Test User");
  });

  it("accepts minimal fields", async () => {
    const res = await request(app)
      .post("/users")
      .send({});
    expect(res.status).toBe(201);
  });
});
