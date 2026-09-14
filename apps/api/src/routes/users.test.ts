import assert from "node:assert/strict";
import express from "express";
import usersRouter from "./users";

// Helper: create an Express app with the users router mounted
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

// Helper: simulate a request to the Express app
async function simulateRequest(
  app: express.Express,
  method: "GET" | "POST",
  path: string,
  body?: unknown
): Promise<{ status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = (server.address() as { port: number }).port;
      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" }
      };
      if (body !== undefined) {
        options.body = JSON.stringify(body);
      }
      fetch(`http://localhost:${port}${path}`, options)
        .then(async (res) => {
          const text = await res.text();
          let parsedBody: unknown = text;
          try {
            parsedBody = JSON.parse(text);
          } catch {
            // not JSON, keep as text
          }
          server.close();
          resolve({ status: res.status, body: parsedBody });
        })
        .catch((err) => {
          server.close();
          reject(err);
        });
    });
  });
}

const app = createTestApp();

// Test 1: GET /users returns 200
{
  const res = await simulateRequest(app, "GET", "/users");
  assert.equal(res.status, 200, "GET /users should return 200");
}

// Test 2: GET /users returns data array
{
  const res = await simulateRequest(app, "GET", "/users");
  const body = res.body as { data: unknown[] };
  assert.ok(Array.isArray(body.data), "GET /users should return data array");
  assert.equal(body.data.length, 0, "GET /users should return empty array for stub");
}

// Test 3: GET /users returns not implemented message
{
  const res = await simulateRequest(app, "GET", "/users");
  const body = res.body as { message: string };
  assert.ok(body.message.includes("not implemented"), "GET /users should mention not implemented");
}

// Test 4: POST /users returns 201
{
  const res = await simulateRequest(app, "POST", "/users", { email: "test@example.com" });
  assert.equal(res.status, 201, "POST /users should return 201");
}

// Test 5: POST /users returns data with id
{
  const res = await simulateRequest(app, "POST", "/users", { email: "test@example.com" });
  const body = res.body as { data: { id: string } };
  assert.ok(body.data.id, "POST /users should return data with id");
  assert.equal(body.data.id, "stub-user-id", "POST /users should return stub user id");
}

// Test 6: POST /users echoes request body
{
  const payload = { email: "echo@example.com", name: "Test User" };
  const res = await simulateRequest(app, "POST", "/users", payload);
  const body = res.body as { data: { email: string; name: string } };
  assert.equal(body.data.email, payload.email, "POST /users should echo email");
  assert.equal(body.data.name, payload.name, "POST /users should echo name");
}

// Test 7: POST /users returns not implemented message
{
  const res = await simulateRequest(app, "POST", "/users", { email: "test@example.com" });
  const body = res.body as { message: string };
  assert.ok(body.message.includes("not implemented"), "POST /users should mention not implemented");
}

// Test 8: POST /users with empty body still returns 201
{
  const res = await simulateRequest(app, "POST", "/users", {});
  assert.equal(res.status, 201, "POST /users with empty body should return 201");
}

// Test 9: GET /users returns JSON content type
{
  const res = await simulateRequest(app, "GET", "/users");
  assert.equal(typeof res.body, "object", "GET /users should return JSON object");
}

// Test 10: POST /users returns JSON content type
{
  const res = await simulateRequest(app, "POST", "/users", { email: "test@example.com" });
  assert.equal(typeof res.body, "object", "POST /users should return JSON object");
}

console.log("All 10 user route tests passed!");
