import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import express from "express";

import usersRouter, { validateCreateUserPayload } from "./users";

type JsonResponse = {
  statusCode: number;
  body: any;
};

async function postUser(payload: unknown): Promise<JsonResponse> {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);

  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(0, resolve));

  const address = server.address();
  assert.notEqual(address, null);
  assert.notEqual(typeof address, "string");

  const port = typeof address === "object" && address ? address.port : 0;
  const body = JSON.stringify(payload);

  try {
    return await new Promise<JsonResponse>((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: "/users",
          method: "POST",
          headers: {
            "content-type": "application/json",
            "content-length": Buffer.byteLength(body)
          }
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          res.on("end", () => {
            const raw = Buffer.concat(chunks).toString("utf8");
            resolve({
              statusCode: res.statusCode ?? 0,
              body: raw ? JSON.parse(raw) : null
            });
          });
        }
      );

      req.on("error", reject);
      req.end(body);
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("validateCreateUserPayload accepts and normalizes valid payloads", () => {
  const result = validateCreateUserPayload({
    name: "  Ada Lovelace  ",
    email: "ADA@Example.COM"
  });

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.deepEqual(result.value, {
      name: "Ada Lovelace",
      email: "ada@example.com"
    });
  }
});

test("POST /users returns a clear error for invalid request shapes", async () => {
  const response = await postUser({ email: "invalid-email" });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error.code, "INVALID_USER_PAYLOAD");
  assert.deepEqual(
    response.body.error.details.map((detail: { field: string }) => detail.field),
    ["name", "email"]
  );
});

test("POST /users rejects unexpected fields instead of mass-assigning them", async () => {
  const response = await postUser({
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "admin"
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error.details[0].field, "role");
});

test("POST /users returns only the validated user fields", async () => {
  const response = await postUser({
    name: "Grace Hopper",
    email: "GRACE@EXAMPLE.COM"
  });

  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.body.data, {
    id: "stub-user-id",
    name: "Grace Hopper",
    email: "grace@example.com"
  });
});
