import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app";

describe("user routes", () => {
  it("lists users with the current stub response", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [],
      message: "User listing is not implemented yet."
    });
  });

  it("creates a user with the current stub response", async () => {
    const payload = {
      email: "maya@example.com",
      name: "Maya Dev"
    };

    const response = await request(app).post("/users").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        id: "stub-user-id",
        ...payload
      },
      message: "User creation is not implemented yet."
    });
  });
});
