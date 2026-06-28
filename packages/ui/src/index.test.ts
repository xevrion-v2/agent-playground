import assert from "node:assert/strict";
import { test } from "node:test";

import { Button } from "./index";

test("Button returns label with disabled defaulting to false", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });
});

test("Button preserves explicit disabled values", () => {
  assert.deepEqual(Button({ label: "Delete", disabled: true }), {
    type: "button",
    label: "Delete",
    disabled: true
  });
});
