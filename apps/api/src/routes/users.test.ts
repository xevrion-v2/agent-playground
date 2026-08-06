import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import router from "./users.js";

// Mock Express req and res types
interface MockReq {
  body: unknown;
}

interface MockRes {
  _status: number;
  _json: any;
  status(code: number): MockRes;
  json(body: any): void;
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
    }
  };
  return res;
}

// Retrieve the route handler from router stack
// In Express, router.post('/') registers a layer.
const postHandler = router.stack.find(
  (layer) => layer.route && layer.route.path === "/" && layer.route.methods.post
)?.route?.stack[0]?.handle;

const getHandler = router.stack.find(
  (layer) => layer.route && layer.route.path === "/" && layer.route.methods.get
)?.route?.stack[0]?.handle;

describe("Users Routes - POST /", () => {
  let res: MockRes;

  beforeEach(() => {
    res = makeRes();
  });

  it("should reject non-object JSON bodies with 400", () => {
    postHandler({ body: "not-an-object" } as any, res, () => {});
    assert.equal(res._status, 400);
    assert.equal(res._json.error, "Bad Request");
    assert.match(res._json.message, /must be a valid JSON object/);
  });

  it("should reject arrays with 400", () => {
    postHandler({ body: [] } as any, res, () => {});
    assert.equal(res._status, 400);
    assert.equal(res._json.error, "Bad Request");
  });

  it("should reject null body with 400", () => {
    postHandler({ body: null } as any, res, () => {});
    assert.equal(res._status, 400);
    assert.equal(res._json.error, "Bad Request");
  });

  it("should require email field", () => {
    postHandler({ body: { name: "Bob" } } as any, res, () => {});
    assert.equal(res._status, 400);
    assert.match(res._json.message, /Email is required/);
  });

  it("should reject invalid email format", () => {
    postHandler({ body: { email: "invalid-email" } } as any, res, () => {});
    assert.equal(res._status, 400);
    assert.match(res._json.message, /must be a valid email address/);
  });

  it("should accept valid email, normalize it to lowercase/trimmed, and generate server id", () => {
    const payload = {
      email: "  Alice.Smith@EXAMPLE.com  ",
      name: "  Alice Smith  ",
      id: "malicious-client-id",
      unrelatedField: "should-be-ignored"
    };

    postHandler({ body: payload } as any, res, () => {});
    assert.equal(res._status, 201);
    
    const data = res._json.data;
    assert.ok(data.id);
    assert.notEqual(data.id, "malicious-client-id"); // Should generate id server-side
    assert.equal(data.email, "alice.smith@example.com"); // Normalized
    assert.equal(data.name, "Alice Smith"); // Normalized
    assert.equal(data.unrelatedField, undefined); // Ignored
  });

  it("should handle optional name field when not provided", () => {
    postHandler({ body: { email: "bob@example.com" } } as any, res, () => {});
    assert.equal(res._status, 201);
    
    const data = res._json.data;
    assert.equal(data.email, "bob@example.com");
    assert.equal(data.name, undefined);
  });
});
