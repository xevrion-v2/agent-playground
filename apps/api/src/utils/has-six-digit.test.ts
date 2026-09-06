import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasSixDigit } from "./has-six-digit";

test("detects six digits", () => {
  assert.equal(hasSixDigit("6"), true);
  assert.equal(hasSixDigit("0"), false);
});
