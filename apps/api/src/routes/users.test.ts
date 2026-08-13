import express from "express";
import { afterEach, describe, expect, it } from "vitest";

import usersRouter from "./users";

const servers: Array<{ close: () => void }> = [];

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

async function request(path: string, init?: RequestInit) {
  const app = createTestApp();
  const server = app.listen(0);
  servers.push(server);
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected test server to listen on a random port.");
  }

  return fetch(`http://127.0.0.1:${address.port}${path}`, init);
}

afterEach(() => {
  for (const server of servers.splice(0)) {
    server.close();
  }
});

describe("POST /users", () => {
  it("rejects missing JSON bodies", async () => {
    const response = await request("/users", {
      method: "POST",
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        message: "Request body is required.",
      },
    });
  });

  it("rejects empty JSON bodies", async () => {
    const response = await request("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        message: "Request body is required.",
      },
    });
  });

  it("preserves the successful stub response for valid payloads", async () => {
    const response = await request("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: "test@example.com" }),
    });

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({
      data: {
        id: "stub-user-id",
        email: "test@example.com",
      },
      message: "User creation is not implemented yet.",
    });
  });
});
