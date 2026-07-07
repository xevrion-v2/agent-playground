import assert from "node:assert/strict";
import test from "node:test";

import { isLeftSquareBracketWithStrokePresent } from "./is-left-square-bracket-with-stroke-present";

test("returns true when the left square bracket with stroke character is present", () => {
  assert.equal(isLeftSquareBracketWithStrokePresent(`abc\u2e55def`), true);
  assert.equal(isLeftSquareBracketWithStrokePresent("abcdef"), false);
  assert.equal(isLeftSquareBracketWithStrokePresent("abc"), false);
});
