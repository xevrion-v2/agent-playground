import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasCloseAngle } from "./has-close-angle";

test("detects close angle characters", () => {
  assert.equal(hasCloseAngle("a>b"), true);
  assert.equal(hasCloseAngle("ab"), false);
});
