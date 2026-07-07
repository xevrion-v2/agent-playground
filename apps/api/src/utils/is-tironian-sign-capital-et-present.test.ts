import assert from "node:assert/strict";
import test from "node:test";

import { isTironianSignCapitalEtPresent } from "./is-tironian-sign-capital-et-present";

test("returns true when the tironian sign capital et character is present", () => {
  assert.equal(isTironianSignCapitalEtPresent(`abc\u2e52def`), true);
  assert.equal(isTironianSignCapitalEtPresent("abcdef"), false);
  assert.equal(isTironianSignCapitalEtPresent("abc"), false);
});
