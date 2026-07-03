import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasLetterZ } from "./has-letter-z";

test("detects letter z", () => {
  assert.equal(hasLetterZ("zebra"), true);
  assert.equal(hasLetterZ("alpha"), false);
});
