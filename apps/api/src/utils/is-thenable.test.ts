import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isThenable } from "./is-thenable";

test("detects thenables", () => {
  assert.equal(isThenable(Promise.resolve("ok")), true);
  assert.equal(isThenable({ then() {} }), true);
  assert.equal(isThenable(async () => {}), false);
  assert.equal(isThenable(null), false);
  assert.equal(isThenable(undefined), false);
  assert.equal(isThenable({ then: 1 }), false);
  assert.equal(isThenable("ok"), false);
});

test("narrows to PromiseLike", () => {
  const value: unknown = { then(onFulfilled: (value: string) => void) { onFulfilled("ok"); } };

  if (isThenable(value)) {
    const narrowed: PromiseLike<unknown> = value;
    assert.equal(typeof narrowed.then, "function");
  } else {
    assert.fail("Expected narrowing");
  }
});
