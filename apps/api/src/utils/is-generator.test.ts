import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isGenerator } from "./is-generator";

test("detects generator objects", () => {
  const generator = (function* () {
    yield 1;
  })();

  assert.equal(isGenerator(generator), true);
  assert.equal(isGenerator((function* () {})()), true);
  assert.equal(isGenerator(async function* () {}), false);
  assert.equal(isGenerator(function* () {}), false);
  assert.equal(isGenerator({ next() {}, return() {}, throw() {} }), false);
  assert.equal(isGenerator(null), false);
});

test("narrows to Generator", () => {
  const value: unknown = (function* () {
    yield "ok";
  })();

  if (isGenerator(value)) {
    const narrowed: Generator = value;
    assert.equal(typeof narrowed.next, "function");
  } else {
    assert.fail("Expected narrowing");
  }
});
