import assert from "node:assert/strict";
import test from "node:test";

import { hasPercentSign } from "./has-percent-sign";

test("returns true when the value contains a percent sign", () => {
  assert.equal(hasPercentSign("50%"), true);
  assert.equal(hasPercentSign("% complete"), true);
  assert.equal(hasPercentSign("discount: 10% off"), true);
});

test("returns false for adjacent non-matching cases", () => {
  assert.equal(hasPercentSign("50 pct"), false);
  assert.equal(hasPercentSign("50 percent"), false);
  assert.equal(hasPercentSign("50／100"), false);
  assert.equal(hasPercentSign(""), false);
});
