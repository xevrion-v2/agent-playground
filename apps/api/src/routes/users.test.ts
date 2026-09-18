import assert from "node:assert/strict";
import { once } from "node:events";
import http, { type Server } from "node:http";
import { type AddressInfo } from "node:net";
import { describe, it } from "node:test";

import express from "express";

import usersRouter from "./users.js";

interface JsonResponse {
  status: number;
  body: unknown;
}

interface UserCreateResponse {
  data: {
    id?: unknown;
    email?: unknown;
    name?: unknown;
    role?: unknown;
  };
  message?: unknown;
}

describe("users routes", () => {
  it("returns 400 for invalid create-user payloads", async () => {
    await withUsersServer(async (baseUrl) => {
      const response = await postJson(baseUrl, "/users", ["not", "object"]);

      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        error: {
          message: "Invalid user payload.",
          details: ["Request body must be a JSON object."]
        }
      });
    });
  });

  it("returns 400 when email is missing or invalid", async () => {
    await withUsersServer(async (baseUrl) => {
      const response = await postJson(baseUrl, "/users", {
        name: "No Email"
      });

      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        error: {
          message: "Invalid user payload.",
          details: ["email is required and must be a string."]
        }
      });
    });
  });

  it("normalizes accepted fields and ignores client-controlled fields", async () => {
    await withUsersServer(async (baseUrl) => {
      const response = await postJson(baseUrl, "/users", {
        id: "client-id",
        email: "  PERSON@Example.COM ",
        name: "  Ada   Lovelace  ",
        role: "admin"
      });

      assert.equal(response.status, 201);
      const body = response.body as UserCreateResponse;
      assert.equal(typeof body.data.id, "string");
      assert.notEqual(body.data.id, "client-id");
      assert.equal(body.data.email, "person@example.com");
      assert.equal(body.data.name, "Ada Lovelace");
      assert.equal(body.data.role, undefined);
      assert.equal(body.message, "User creation is not implemented yet.");
    });
  });
});

async function withUsersServer(
  run: (baseUrl: string) => Promise<void>
): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");

  try {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected test server to listen on a TCP port.");
    }

    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await closeServer(server);
  }
}

async function postJson(
  baseUrl: string,
  path: string,
  payload: unknown
): Promise<JsonResponse> {
  const url = new URL(path, baseUrl);
  const requestBody = JSON.stringify(payload);

  return new Promise<JsonResponse>((resolve, reject) => {
    const request = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody)
        }
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolve({
            status: response.statusCode ?? 0,
            body: JSON.parse(body)
          });
        });
      }
    );

    request.on("error", reject);
    request.write(requestBody);
    request.end();
  });
}

async function closeServer(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
