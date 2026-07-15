import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isPunctuationSpacePresent } from "./is-punctuation-space-present";

test("detects punctuation space characters", () => {
  assert.equal(isPunctuationSpacePresent(`a\u2008b`), true);
  assert.equal(isPunctuationSpacePresent("ab"), false);
  assert.equal(isPunctuationSpacePresent(""), false);
});
