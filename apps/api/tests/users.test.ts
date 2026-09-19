import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import http from "node:http";

import usersRouter from "../src/routes/users";

type JsonRequestResult = {
  status: number;
  body: unknown;
  raw: string;
};

async function requestJson(
  app: express.Express,
  method: string,
  path: string,
  payload: unknown
): Promise<JsonRequestResult> {
  const server = http.createServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);

    server.listen(0, "127.0.0.1", () => {
      resolve();
    });
  });

  try {
    const address = server.address();

    if (
      !address ||
      typeof address === "string"
    ) {
      throw new Error(
        "Could not resolve local server"
      );
    }

    const requestBody = JSON.stringify(payload);

    return await new Promise<JsonRequestResult>(
      (resolve, reject) => {
        const req = http.request(
          {
            hostname: "127.0.0.1",
            port: address.port,
            path,
            method,
            headers: {
              "content-type": "application/json",
              "content-length":
                Buffer.byteLength(requestBody)
            }
          },
          (res) => {
            const chunks: Buffer[] = [];

            res.on("data", (chunk) => {
              chunks.push(
                Buffer.isBuffer(chunk)
                  ? chunk
                  : Buffer.from(chunk)
              );
            });

            res.on("end", () => {
              const raw = Buffer.concat(chunks)
                .toString("utf8");

              let body: unknown = raw;

              try {
                body = JSON.parse(raw);
              } catch {
                // Keep raw response.
              }

              resolve({
                status: res.statusCode ?? 0,
                body,
                raw
              });
            });
          }
        );

        req.once("error", reject);

        req.write(requestBody);
        req.end();
      }
    );
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/users", usersRouter);

  return app;
}

function unwrapUser(
  result: JsonRequestResult
): Record<string, unknown> {
  const responseBody =
    result.body as Record<string, unknown>;

  if (
    responseBody &&
    typeof responseBody === "object" &&
    responseBody.data &&
    typeof responseBody.data === "object" &&
    !Array.isArray(responseBody.data)
  ) {
    return responseBody.data as Record<string, unknown>;
  }

  return responseBody;
}

test(
  "ignores client-controlled id",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "user@example.com",
        name: "Test User",
        id: "client-controlled-id"
      }
    );

    assert.equal(result.status, 201);

    const user = unwrapUser(result);

    assert.notEqual(
      user.id,
      "client-controlled-id"
    );
  }
);

test(
  "ignores unrelated fields",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "user@example.com",
        name: "Test User",
        unexpectedField: "must-not-survive"
      }
    );

    assert.equal(result.status, 201);

    const user = unwrapUser(result);

    assert.equal(
      Object.prototype.hasOwnProperty.call(
        user,
        "unexpectedField"
      ),
      false
    );
  }
);

test(
  "normalizes email",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "  USER@EXAMPLE.COM  ",
        name: "Test User"
      }
    );

    assert.equal(result.status, 201);

    const user = unwrapUser(result);

    assert.equal(
      user.email,
      "user@example.com"
    );
  }
);

test(
  "normalizes name",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "user@example.com",
        name: "   Test User   "
      }
    );

    assert.equal(result.status, 201);

    const user = unwrapUser(result);

    assert.equal(
      user.name,
      "Test User"
    );
  }
);

test(
  "rejects missing email",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        name: "Test User"
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects malformed email without at-sign",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "not-an-email",
        name: "Test User"
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects email missing domain",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "a@",
        name: "Test User"
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects email missing local part",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "@example.com",
        name: "Test User"
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects email with multiple at-signs",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "a@@example.com",
        name: "Test User"
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects non-string name",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      {
        email: "user@example.com",
        name: 123
      }
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects null body",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      null
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects array body",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      [
        {
          email: "user@example.com"
        }
      ]
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);

test(
  "rejects numeric body",
  async () => {
    const result = await requestJson(
      createApp(),
      "POST",
      "/users",
      123
    );

    assert.ok(
      result.status >= 400 &&
      result.status < 500
    );
  }
);