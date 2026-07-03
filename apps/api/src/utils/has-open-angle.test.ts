import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasOpenAngle } from "./has-open-angle";

test("detects open angle characters", () => {
  assert.equal(hasOpenAngle("a<b"), true);
  assert.equal(hasOpenAngle("ab"), false);
});
