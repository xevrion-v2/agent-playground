import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasLetterC } from "./has-letter-c";

test("detects letter c", () => {
  assert.equal(hasLetterC("cello"), true);
  assert.equal(hasLetterC("alpha"), false);
});
