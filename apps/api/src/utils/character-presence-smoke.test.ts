import test from "node:test";
import assert from "node:assert/strict";

import { isHangulFillerPresent } from "./is-hangul-filler-present";
import { isReplacementCharacterPresent } from "./is-replacement-character-present";
import { isSoftHyphenPresent } from "./is-soft-hyphen-present";
import { isSpaceSymbolPresent } from "./is-space-symbol-present";

test("character presence helpers detect only their target characters", () => {
  assert.equal(isHangulFillerPresent("alpha\u3164beta"), true);
  assert.equal(isHangulFillerPresent("alpha beta"), false);

  assert.equal(isSoftHyphenPresent("soft\u00ADhyphen"), true);
  assert.equal(isSoftHyphenPresent("soft-hyphen"), false);

  assert.equal(isReplacementCharacterPresent("bad\uFFFDtext"), true);
  assert.equal(isReplacementCharacterPresent("bad text"), false);

  assert.equal(isSpaceSymbolPresent("a b"), true);
  assert.equal(isSpaceSymbolPresent("a_b"), false);
});
