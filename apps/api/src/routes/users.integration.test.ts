import { test } from "node:test";
import assert from "node:assert";
import { createServer, Server } from "http";
import { request } from "http";
import express, { Express } from "express";
import usersRouter from "./users.js";

let testServer: Server;
let testPort: number;

/**
 * Integration tests for user routes
 * Tests POST /users (create) and GET / (list) endpoints
 */
test("User Routes Integration Tests", async (t) => {
  // Setup: Create test app
  const app: Express = express();
  app.use(express.json({ strict: false }));
  app.use("/", usersRouter);

  await new Promise<void>((resolve) => {
    testServer = createServer(app);
    testServer.listen(0, () => {
      testPort = (testServer.address() as { port: number }).port;
      resolve();
    });
  });

  // Test GET / (list users)
  await t.test("GET / should list users", async () => {
    const response = await makeRequest("GET", "/");
    assert.strictEqual(response.status, 200);

    const data = response.data as any;
    assert.ok(data.data);
    assert.ok(Array.isArray(data.data));
  });

  // Test POST / with valid email
  await t.test("POST / with valid email should create user", async () => {
    const response = await makeRequest("POST", "/", { email: "user@example.com" });
    assert.strictEqual(response.status, 201);

    const data = response.data as any;
    assert.ok(data.data.id);
    assert.strictEqual(data.data.email, "user@example.com");
  });

  // Test POST / with email and name
  await t.test("POST / with email and name should normalize fields", async () => {
    const response = await makeRequest("POST", "/", {
      email: "TEST@EXAMPLE.COM",
      name: "  John Doe  "
    });
    assert.strictEqual(response.status, 201);

    const data = response.data as any;
    assert.strictEqual(data.data.email, "test@example.com");
    assert.strictEqual(data.data.name, "John Doe");
  });

  // Cleanup
  testServer.close();
});

/**
 * Helper to make HTTP requests to test server
 * @param method - HTTP method
 * @param path - URL path
 * @param body - Request body (optional)
 * @returns Response with status and parsed data
 */
async function makeRequest(
  method: string,
  path: string,
  body?: unknown
): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const reqBody = body !== undefined ? JSON.stringify(body) : "";
    const options = {
      hostname: "localhost",
      port: testPort,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(reqBody)
      }
    };

    try {
      const req = request(options, (res: any) => {
        let data = "";
        res.on("data", (chunk: string) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({
              status: res.statusCode,
              data: data ? JSON.parse(data) : {}
            });
          } catch {
            resolve({
              status: res.statusCode,
              data: { raw: data }
            });
          }
        });
      });

      req.on("error", reject);
      if (reqBody) req.write(reqBody);
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}
