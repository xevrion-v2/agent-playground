import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasLetterX } from "./has-letter-x";

test("detects letter x", () => {
  assert.equal(hasLetterX("xenon"), true);
  assert.equal(hasLetterX("alpha"), false);
});
