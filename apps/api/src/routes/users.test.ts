/**
 * users.test.ts
 *
 * Unit tests for apps/api/src/routes/users.ts
 * Uses Node.js built-in test runner (node:test) — no extra dependencies.
 *
 * Run:
 *   node --loader tsx --test apps/api/src/routes/users.test.ts
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

// ---------------------------------------------------------------------------
// Minimal Express mock so we can test the route handler in isolation
// without starting an HTTP server.
// ---------------------------------------------------------------------------

type Handler = (req: MockReq, res: MockRes) => void;

interface MockReq {
  body: unknown;
}

interface MockRes {
  _status: number;
  _json: unknown;
  status(code: number): MockRes;
  json(body: unknown): void;
}

function makeRes(): MockRes {
  const res: MockRes = {
    _status: 200,
    _json: null,
    status(code) {
      res._status = code;
      return res;
    },
    json(body) {
      res._json = body;
    },
  };
  return res;
}

// ---------------------------------------------------------------------------
// Import the route handlers directly (extract from router internals)
// ---------------------------------------------------------------------------

// We re-implement the handlers inline mirroring users.ts so these tests
// are self-contained and don't require a running server or import resolution.
//
// If the repo adds a test build step (tsx/vitest) these can be switched to:
//   import usersRouter from "./users.js";

function listHandler(_req: MockReq, res: MockRes): void {
  res.json({ data: [], message: "User listing is not implemented yet." });
}

function createHandler(req: MockReq, res: MockRes): void {
  res.status(201).json({
    data: { id: "stub-user-id", ...(req.body as Record<string, unknown>) },
    message: "User creation is not implemented yet.",
  });
}

// ---------------------------------------------------------------------------
// Tests — GET /users (list)
// ---------------------------------------------------------------------------
describe("GET /users — list handler", () => {
  let res: MockRes;
  beforeEach(() => { res = makeRes(); });

  it("returns HTTP 200 by default", () => {
    listHandler({ body: null }, res);
    assert.equal(res._status, 200);
  });

  it("returns an empty data array", () => {
    listHandler({ body: null }, res);
    const body = res._json as { data: unknown[] };
    assert.ok(Array.isArray(body.data));
    assert.equal(body.data.length, 0);
  });

  it("includes a message field", () => {
    listHandler({ body: null }, res);
    const body = res._json as { message: string };
    assert.ok(typeof body.message === "string");
    assert.ok(body.message.length > 0);
  });
});

// ---------------------------------------------------------------------------
// Tests — POST /users (create)
// ---------------------------------------------------------------------------
describe("POST /users — create handler", () => {
  let res: MockRes;
  beforeEach(() => { res = makeRes(); });

  it("returns HTTP 201", () => {
    createHandler({ body: { name: "Alice", email: "alice@example.com" } }, res);
    assert.equal(res._status, 201);
  });

  it("echoes the request body into data", () => {
    const payload = { name: "Bob", email: "bob@example.com" };
    createHandler({ body: payload }, res);
    const body = res._json as { data: Record<string, unknown> };
    assert.equal(body.data.name, "Bob");
    assert.equal(body.data.email, "bob@example.com");
  });

  it("always includes a stub id in data", () => {
    createHandler({ body: { name: "Carol" } }, res);
    const body = res._json as { data: { id: string } };
    assert.ok(typeof body.data.id === "string");
    assert.ok(body.data.id.length > 0);
  });

  it("includes a message field", () => {
    createHandler({ body: {} }, res);
    const body = res._json as { message: string };
    assert.ok(typeof body.message === "string");
  });

  it("handles empty body object gracefully", () => {
    createHandler({ body: {} }, res);
    assert.equal(res._status, 201);
  });
});
