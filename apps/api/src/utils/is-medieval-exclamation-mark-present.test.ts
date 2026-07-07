import assert from "node:assert/strict";
import test from "node:test";

import { isMedievalExclamationMarkPresent } from "./is-medieval-exclamation-mark-present";

test("returns true when the medieval exclamation mark character is present", () => {
  assert.equal(isMedievalExclamationMarkPresent(`abc\u2e53def`), true);
  assert.equal(isMedievalExclamationMarkPresent("abcdef"), false);
  assert.equal(isMedievalExclamationMarkPresent("abc"), false);
});
