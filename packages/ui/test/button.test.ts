import { test } from "node:test";
import * as assert from "node:assert/strict";

import { Button } from "../src/index";

test("Button preserves its label", () => {
  assert.equal(Button({ label: "Save" }).label, "Save");
});

test("Button defaults disabled to false", () => {
  assert.equal(Button({ label: "Save" }).disabled, false);
});

test("Button preserves an explicit disabled value", () => {
  assert.equal(Button({ label: "Save", disabled: true }).disabled, true);
});
