import assert from "node:assert/strict";
import test from "node:test";

import { isRightSquareBracketWithDoubleStrokePresent } from "./is-right-square-bracket-with-double-stroke-present";

test("returns true when the right square bracket with double stroke character is present", () => {
  assert.equal(isRightSquareBracketWithDoubleStrokePresent(`abc\u2e58def`), true);
  assert.equal(isRightSquareBracketWithDoubleStrokePresent("abcdef"), false);
  assert.equal(isRightSquareBracketWithDoubleStrokePresent("abc"), false);
});
