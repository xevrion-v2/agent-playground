import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasLetterB } from "./has-letter-b";

test("detects letter b", () => {
  assert.equal(hasLetterB("beta"), true);
  assert.equal(hasLetterB("alpha"), false);
});
