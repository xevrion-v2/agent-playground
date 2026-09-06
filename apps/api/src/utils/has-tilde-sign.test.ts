import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasTildeSign } from "./has-tilde-sign";

test("detects tilde signs", () => {
  assert.equal(hasTildeSign("path~to"), true);
  assert.equal(hasTildeSign("path/to"), false);
});
