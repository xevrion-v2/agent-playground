import assert from "node:assert/strict";
import test from "node:test";

import { hasAtSymbolCharacter } from "./has-at-symbol-character";

test("returns true when the at symbol is present", () => {
  assert.equal(hasAtSymbolCharacter("name@example.com"), true);
});

test("returns false when the at symbol is absent", () => {
  assert.equal(hasAtSymbolCharacter("example.com"), false);
});
