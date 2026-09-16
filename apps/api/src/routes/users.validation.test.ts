import assert from "node:assert/strict";
import express from "express";
import usersRouter from "./users";

// Helper: create an Express app with the users router
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

// Helper: simulate a request
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
            // not JSON
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

// Test 1: Reject non-object JSON body (array)
{
  const res = await simulateRequest(app, "POST", "/users", ["not", "an", "object"]);
  assert.equal(res.status, 400, "Array body should return 400");
  const body = res.body as { error: { message: string } };
  assert.ok(body.error.message.includes("object"), "Should mention object requirement");
}

// Test 2: Reject non-object JSON body (string)
{
  const res = await simulateRequest(app, "POST", "/users", "just a string");
  assert.equal(res.status, 400, "String body should return 400");
}

// Test 3: Reject non-object JSON body (number)
{
  const res = await simulateRequest(app, "POST", "/users", 42);
  assert.equal(res.status, 400, "Number body should return 400");
}

// Test 4: Reject missing email
{
  const res = await simulateRequest(app, "POST", "/users", { name: "Test" });
  assert.equal(res.status, 400, "Missing email should return 400");
  const body = res.body as { error: { message: string } };
  assert.ok(body.error.message.includes("email"), "Should mention email required");
}

// Test 5: Reject invalid email format
{
  const res = await simulateRequest(app, "POST", "/users", { email: "not-an-email" });
  assert.equal(res.status, 400, "Invalid email should return 400");
}

// Test 6: Accept valid email and return 201
{
  const res = await simulateRequest(app, "POST", "/users", { email: "user@example.com" });
  assert.equal(res.status, 201, "Valid email should return 201");
  const body = res.body as { data: { id: string; email: string } };
  assert.ok(body.data.id, "Should return generated id");
  assert.equal(body.data.email, "user@example.com", "Should return email");
}

// Test 7: Normalize email (trim + lowercase)
{
  const res = await simulateRequest(app, "POST", "/users", { email: "  User@Example.COM  " });
  assert.equal(res.status, 201, "Email with whitespace should return 201");
  const body = res.body as { data: { email: string } };
  assert.equal(body.data.email, "user@example.com", "Email should be normalized");
}

// Test 8: Normalize name (trim + collapse spaces)
{
  const res = await simulateRequest(app, "POST", "/users", {
    email: "user@example.com",
    name: "  John   Doe  "
  });
  assert.equal(res.status, 201, "Name with extra spaces should return 201");
  const body = res.body as { data: { name: string } };
  assert.equal(body.data.name, "John Doe", "Name should be normalized");
}

// Test 9: Ignore client-supplied id
{
  const res = await simulateRequest(app, "POST", "/users", {
    email: "user@example.com",
    id: "malicious-client-id"
  });
  assert.equal(res.status, 201, "Client id should be ignored, not rejected");
  const body = res.body as { data: { id: string } };
  assert.notEqual(body.data.id, "malicious-client-id", "Client id should not be used");
  assert.ok(body.data.id.startsWith("user-"), "Should use server-generated id");
}

// Test 10: Ignore unrelated/extra fields
{
  const res = await simulateRequest(app, "POST", "/users", {
    email: "user@example.com",
    isAdmin: true,
    role: "superuser",
    password: "hacked"
  });
  assert.equal(res.status, 201, "Extra fields should be ignored, not rejected");
  const body = res.body as { data: Record<string, unknown> };
  assert.equal(Object.keys(body.data).length, 2, "Should only have id and email");
  assert.ok(!("isAdmin" in body.data), "Should not include isAdmin");
  assert.ok(!("password" in body.data), "Should not include password");
}

// Test 11: Reject name that is not a string
{
  const res = await simulateRequest(app, "POST", "/users", {
    email: "user@example.com",
    name: 12345
  });
  assert.equal(res.status, 400, "Non-string name should return 400");
}

// Test 12: Empty name after trimming is omitted
{
  const res = await simulateRequest(app, "POST", "/users", {
    email: "user@example.com",
    name: "   "
  });
  assert.equal(res.status, 201, "Whitespace-only name should return 201");
  const body = res.body as { data: Record<string, unknown> };
  assert.ok(!("name" in body.data), "Empty name should be omitted");
}

console.log("All 12 user payload validation tests passed!");
