import test, { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import userRoutes from "./users";

describe("User Routes", () => {
  let app: express.Express;
  let server: any;
  const PORT = 4001;

  before((done) => {
    app = express();
    app.use(express.json());
    app.use("/users", userRoutes);
    server = app.listen(PORT, () => done());
  });

  after(() => {
    server.close();
  });

  it("GET /users should return list stub", async () => {
    const res = await fetch(`http://localhost:${PORT}/users`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.message, "User listing is not implemented yet.");
    assert.deepEqual(data.data, []);
  });

  it("POST /users should return create stub", async () => {
    const res = await fetch(`http://localhost:${PORT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", email: "test@example.com" })
    });
    // Assuming the main branch users.ts returns 201 without the input validation (which is on a separate branch)
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.message, "User creation is not implemented yet.");
    assert.equal(data.data.id, "stub-user-id");
  });
});
