import assert from "node:assert/strict";
import { test } from "node:test";

import { isPromiseLike } from "./is-promise-like.ts";

test("returns true for Promise instances and thenable values", () => {
  assert.equal(isPromiseLike(Promise.resolve("ok")), true);
  assert.equal(isPromiseLike({ then() {} }), true);

  function callableThenable() {}
  Object.assign(callableThenable, { then() {} });
  assert.equal(isPromiseLike(callableThenable), true);
});

test("returns false for values without a callable then property", () => {
  assert.equal(isPromiseLike(null), false);
  assert.equal(isPromiseLike(undefined), false);
  assert.equal(isPromiseLike("then"), false);
  assert.equal(isPromiseLike(1), false);
  assert.equal(isPromiseLike({}), false);
  assert.equal(isPromiseLike({ then: "not a function" }), false);
});

test("returns false when reading then throws", () => {
  const value = Object.defineProperty({}, "then", {
    get() {
      throw new Error("untrusted then accessor");
    },
  });

  assert.equal(isPromiseLike(value), false);
});
