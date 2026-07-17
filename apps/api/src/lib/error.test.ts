import { test } from "node:test";
import assert from "node:assert/strict";
import { sendError } from "./error.ts";

function mockRes() {
  const res: any = { statusCode: 0, body: undefined };
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj: unknown) => {
    res.body = obj;
    return res;
  };
  return res;
}

test("sendError writes status + envelope and returns the response", () => {
  const res = mockRes();
  const out = sendError(res, 400, "bad input", { field: "email" });
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, "error");
  assert.equal(res.body.message, "bad input");
  assert.deepEqual(res.body.details, { field: "email" });
  assert.equal(out, res);
});

test("sendError omits details when undefined", () => {
  const res = mockRes();
  sendError(res, 500, "boom");
  assert.equal(res.statusCode, 500);
  assert.equal(res.body.details, undefined);
});
