import assert from "node:assert/strict";
import { test } from "node:test";

import { Button } from "../src/index";

test("Button returns label and enabled state by default", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });
});

test("Button returns disabled state when requested", () => {
  assert.deepEqual(Button({ label: "Delete", disabled: true }), {
    type: "button",
    label: "Delete",
    disabled: true
  });
});
