import assert from "node:assert/strict";
import test from "node:test";

import { hasPeriodCharacter } from "./has-period-character";

test("returns true when the period character is present", () => {
  assert.equal(hasPeriodCharacter("hello.world"), true);
});

test("returns false when the period character is absent", () => {
  assert.equal(hasPeriodCharacter("helloworld"), false);
});
