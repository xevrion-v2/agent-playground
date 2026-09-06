import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasCaretSign } from "./has-caret-sign";

test("detects caret signs", () => {
  assert.equal(hasCaretSign("a^b"), true);
  assert.equal(hasCaretSign("ab"), false);
});
