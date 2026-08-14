import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isParagraphSeparatorPresent } from "./is-paragraph-separator-present";

test("detects paragraph separator characters", () => {
  assert.equal(isParagraphSeparatorPresent(`a\u2029b`), true);
  assert.equal(isParagraphSeparatorPresent("ab"), false);
});
