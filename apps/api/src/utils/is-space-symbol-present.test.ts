import assert from "node:assert/strict";
import test from "node:test";

import { isSpaceSymbolPresent } from "./is-space-symbol-present";

test("returns true when the space symbol is present", () => {
  assert.equal(isSpaceSymbolPresent("hello world"), true);
  assert.equal(isSpaceSymbolPresent("helloworld"), false);
  assert.equal(isSpaceSymbolPresent("abc"), false);
});
