import assert from "node:assert/strict";
import test from "node:test";

import { isMedievalCommaPresent } from "./is-medieval-comma-present";

test("returns true when the medieval comma character is present", () => {
  assert.equal(isMedievalCommaPresent(`abc\u2e4cdef`), true);
  assert.equal(isMedievalCommaPresent("abcdef"), false);
  assert.equal(isMedievalCommaPresent("abc"), false);
});
