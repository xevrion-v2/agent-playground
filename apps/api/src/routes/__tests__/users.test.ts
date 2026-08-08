import request from "supertest";
import express from "express";
import router from "../users";

const app = express();
app.use(express.json());
app.use("/users", router);

describe("User Routes", () => {
  it("should return a stub message for user listing", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  it("should return a stub message for user creation", async () => {
    const userData = { name: "Test User", email: "test@example.com" };
    const res = await request(app).post("/users").send(userData);
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      id: "stub-user-id",
      ...userData
    });
    expect(res.body.message).toBe("User creation is not implemented yet.");
  });
});
