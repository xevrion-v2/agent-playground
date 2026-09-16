import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index";

test("Button preserves the provided label and defaults disabled to false", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false
  });
});

test("Button preserves an explicit disabled value", () => {
  assert.deepEqual(Button({ label: "Delete", disabled: true }), {
    type: "button",
    label: "Delete",
    disabled: true
  });
});
