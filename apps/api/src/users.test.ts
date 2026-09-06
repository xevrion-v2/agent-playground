import express from "express";
import request from "supertest";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("GET /users", () => {
  it("returns an empty data array", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
});

describe("POST /users", () => {
  it("returns 201 with the submitted body", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("stub-user-id");
    expect(res.body.data.name).toBe("Alice");
  });
});
