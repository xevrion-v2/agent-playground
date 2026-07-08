import assert from "node:assert/strict";
import test from "node:test";

import { isCornishVerseDividerPresent } from "./is-cornish-verse-divider-present";

test("returns true when the cornish verse divider character is present", () => {
  assert.equal(isCornishVerseDividerPresent(`abc\u2e4fdef`), true);
  assert.equal(isCornishVerseDividerPresent("abcdef"), false);
  assert.equal(isCornishVerseDividerPresent("abc"), false);
});
