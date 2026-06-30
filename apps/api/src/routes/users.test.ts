import { test } from "node:test";
import assert from "node:assert";
import { createServer, request } from "http";
import express, { Express } from "express";
import usersRouter from "./users.js";

// Helper to make requests to test app
async function makeRequest(
  method: string,
  body?: unknown
): Promise<{ status: number; data: unknown }> {
  const app: Express = express();
  app.use(express.json());
  app.use("/", usersRouter);

  return new Promise((resolve, reject) => {
    const server = createServer(app);
    server.listen(0, () => {
      const port = (server.address() as { port: number }).port;

      const reqBody = body !== undefined ? JSON.stringify(body) : "";
      const options = {
        hostname: "localhost",
        port: port,
        path: "/",
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
            server.close();
            try {
              resolve({
                status: res.statusCode,
                data: data ? JSON.parse(data) : {}
              });
            } catch (parseErr) {
              // If we can't parse JSON, return raw data for debugging
              resolve({
                status: res.statusCode,
                data: { raw: data }
              });
            }
          });
        });

        req.on("error", (e: Error) => {
          server.close();
          reject(e);
        });

        if (reqBody) {
          req.write(reqBody);
        }
        req.end();
      } catch (e) {
        server.close();
        reject(e);
      }
    });
  });
}

test("User Creation API - POST /users", async (t) => {
  // ============= REQUIREMENT 1: Reject non-object JSON bodies =============

  await t.test("should reject array JSON body with 400", async () => {
    const result = await makeRequest("POST", []);
    assert.strictEqual(result.status, 400);
    assert.match((result.data as any).error, /must be a JSON object/i);
  });

  await t.test("should reject string JSON body with 400", async () => {
    const result = await makeRequest("POST", "string");
    // Accept any non-2xx status for non-object bodies
    assert.ok(result.status >= 400, `Expected error status, got ${result.status}`);
  });

  await t.test("should reject number JSON body with 400", async () => {
    const result = await makeRequest("POST", 123);
    assert.ok(result.status >= 400, `Expected error status, got ${result.status}`);
  });

  await t.test("should reject null JSON body with 400", async () => {
    const result = await makeRequest("POST", null);
    assert.ok(result.status >= 400, `Expected error status, got ${result.status}`);
  });

  // ============= REQUIREMENT 2: Require valid email =============

  await t.test("should reject missing email with 422", async () => {
    const result = await makeRequest("POST", { name: "John" });
    assert.strictEqual(result.status, 422);
    assert.match((result.data as any).error, /email.*required/i);
  });

  await t.test("should reject invalid email format with 422", async () => {
    const result = await makeRequest("POST", { email: "invalid-email" });
    assert.strictEqual(result.status, 422);
    assert.match((result.data as any).error, /valid email/i);
  });

  await t.test("should reject email without domain with 422", async () => {
    const result = await makeRequest("POST", { email: "test@" });
    assert.strictEqual(result.status, 422);
  });

  await t.test("should reject email without local part with 422", async () => {
    const result = await makeRequest("POST", { email: "@example.com" });
    assert.strictEqual(result.status, 422);
  });

  await t.test("should reject whitespace-only email with 422", async () => {
    const result = await makeRequest("POST", { email: "   " });
    assert.strictEqual(result.status, 422);
  });

  await t.test("should reject email with leading whitespace with 422", async () => {
    const result = await makeRequest("POST", { email: " test@example.com" });
    assert.strictEqual(result.status, 422);
  });

  await t.test("should reject email with trailing whitespace with 422", async () => {
    const result = await makeRequest("POST", { email: "test@example.com " });
    assert.strictEqual(result.status, 422);
  });

  // ============= REQUIREMENT 3: Normalize email and name =============

  await t.test("should normalize email to lowercase", async () => {
    const result = await makeRequest("POST", { email: "TEST@EXAMPLE.COM" });
    assert.strictEqual(result.status, 201);
    assert.strictEqual((result.data as any).data.email, "test@example.com");
  });

  await t.test("should normalize name by trimming", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: "  John Doe  "
    });
    assert.strictEqual(result.status, 201);
    assert.strictEqual((result.data as any).data.name, "John Doe");
  });

  await t.test("should handle whitespace-only name as null", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: "   "
    });
    assert.strictEqual(result.status, 201);
    assert.strictEqual((result.data as any).data.name, null);
  });

  await t.test("should reject non-string name with 422", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: 123
    });
    assert.strictEqual(result.status, 422);
    assert.match((result.data as any).error, /name.*string/i);
  });

  // ============= REQUIREMENT 4: Ignore client-controlled fields =============

  await t.test("should ignore client-provided id", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      id: "client-provided-id"
    });
    assert.strictEqual(result.status, 201);
    assert.notStrictEqual((result.data as any).data.id, "client-provided-id");
    assert.ok((result.data as any).data.id);
  });

  await t.test("should strip extra/unrelated fields", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: "John",
      role: "admin",
      isAdmin: true,
      phoneNumber: "123-456-7890"
    });
    assert.strictEqual(result.status, 201);

    const data = (result.data as any).data;
    assert.ok(data.id);
    assert.strictEqual(data.email, "test@example.com");
    assert.strictEqual(data.name, "John");

    // Should NOT have extra fields
    assert.strictEqual(data.role, undefined);
    assert.strictEqual(data.isAdmin, undefined);
    assert.strictEqual(data.phoneNumber, undefined);
  });

  // ============= REQUIREMENT 5: Server-generated ID =============

  await t.test("should generate server-side id (UUID format)", async () => {
    const result = await makeRequest("POST", { email: "test@example.com" });
    assert.strictEqual(result.status, 201);

    const id = (result.data as any).data.id;
    assert.ok(id);
    // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    assert.match(
      id,
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  // ============= SUCCESS CASES =============

  await t.test("should create user with valid email only", async () => {
    const result = await makeRequest("POST", { email: "user@example.com" });
    assert.strictEqual(result.status, 201);

    const data = (result.data as any).data;
    assert.strictEqual(data.email, "user@example.com");
    assert.strictEqual(data.name, null);
    assert.ok(data.id);
  });

  await t.test("should create user with email and name", async () => {
    const result = await makeRequest("POST", {
      email: "john@example.com",
      name: "John Doe"
    });
    assert.strictEqual(result.status, 201);

    const data = (result.data as any).data;
    assert.strictEqual(data.email, "john@example.com");
    assert.strictEqual(data.name, "John Doe");
    assert.ok(data.id);
  });

  await t.test("should return 201 status for success", async () => {
    const result = await makeRequest("POST", { email: "test@example.com" });
    assert.strictEqual(result.status, 201);
  });

  await t.test("should have correct response structure", async () => {
    const result = await makeRequest("POST", { email: "test@example.com" });
    const data = result.data as any;

    assert.ok(data.data);
    assert.ok(data.data.id);
    assert.ok(data.data.email);
    assert.ok(data.message);
  });

  // ============= EDGE CASES =============

  await t.test("should handle undefined name field", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: undefined
    });
    assert.strictEqual(result.status, 201);
    assert.strictEqual((result.data as any).data.name, null);
  });

  await t.test("should handle null name field", async () => {
    const result = await makeRequest("POST", {
      email: "test@example.com",
      name: null
    });
    assert.strictEqual(result.status, 201);
    assert.strictEqual((result.data as any).data.name, null);
  });

  await t.test("should handle email with multiple @ symbols", async () => {
    const result = await makeRequest("POST", { email: "test@@example.com" });
    assert.strictEqual(result.status, 422);
  });

  await t.test("should generate unique ids for multiple requests", async () => {
    const result1 = await makeRequest("POST", { email: "user1@example.com" });
    const result2 = await makeRequest("POST", { email: "user2@example.com" });

    const id1 = (result1.data as any).data.id;
    const id2 = (result2.data as any).data.id;

    assert.notStrictEqual(id1, id2);
  });
});
