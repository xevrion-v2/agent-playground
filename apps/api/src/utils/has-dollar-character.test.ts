import assert from "node:assert/strict";
import test from "node:test";

import { hasDollarCharacter } from "./has-dollar-character";

test("returns true when the dollar character is present", () => {
  assert.equal(hasDollarCharacter("price $10"), true);
});

test("returns false when the dollar character is absent", () => {
  assert.equal(hasDollarCharacter("price 10"), false);
});
