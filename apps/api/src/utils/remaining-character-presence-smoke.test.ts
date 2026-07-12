import test from "node:test";
import assert from "node:assert/strict";

import { isObjectReplacementCharacterPresent } from "./is-object-replacement-character-present";
import { isRightToLeftMarkPresent } from "./is-right-to-left-mark-present";

test("remaining character helpers detect only their target characters", () => {
  assert.equal(isObjectReplacementCharacterPresent("object\uFFFCreplacement"), true);
  assert.equal(isObjectReplacementCharacterPresent("object replacement"), false);
  assert.equal(isObjectReplacementCharacterPresent(""), false);

  assert.equal(isRightToLeftMarkPresent("rtl\u200Fmark"), true);
  assert.equal(isRightToLeftMarkPresent("rtl mark"), false);
  assert.equal(isRightToLeftMarkPresent(""), false);
});
