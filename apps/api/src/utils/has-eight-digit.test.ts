import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasEightDigit } from "./has-eight-digit";

test("detects eight digits", () => {
  assert.equal(hasEightDigit("8"), true);
  assert.equal(hasEightDigit("0"), false);
});
