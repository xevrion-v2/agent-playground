import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasNineDigit } from "./has-nine-digit";

test("detects nine digits", () => {
  assert.equal(hasNineDigit("n9"), true);
  assert.equal(hasNineDigit("n0"), false);
});
